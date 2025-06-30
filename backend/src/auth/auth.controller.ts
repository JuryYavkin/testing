import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validate(body.username, body.password);
    const token = this.authService.sign(user);
    return { token, role: user.role };
  }
}
