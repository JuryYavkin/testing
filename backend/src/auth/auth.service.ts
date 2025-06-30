import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, Role } from '../models/user.model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async validate(username: string, password: string): Promise<User> {
    let user = await this.userModel.findOne({ where: { username } });
    if (!user) {
      const role = username === 'admin' ? Role.ADMIN : username === 'Никита' ? Role.NIKITA : Role.PLAYER;
      user = await this.userModel.create({ username, password, role });
    } else if (user.password !== password) {
      throw new UnauthorizedException();
    }
    return user;
  }

  sign(user: User) {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret');
  }
}
