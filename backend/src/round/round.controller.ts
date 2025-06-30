import { Body, Controller, Get, Param, Post, Headers } from '@nestjs/common';
import { RoundService } from './round.service';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

function auth(headers: Record<string, string | undefined>): User | null {
  const token = headers['authorization']?.split(' ')[1];
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
  } catch {
    return null;
  }
}

@Controller('rounds')
export class RoundController {
  constructor(private service: RoundService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Post()
  create(@Headers() headers: any) {
    const user = auth(headers);
    if (!user) return { error: 'Unauthorized' };
    return this.service.create(user as any);
  }

  @Get(':id')
  info(@Param('id') id: string, @Headers() headers: any) {
    const user = auth(headers);
    return this.service.info(id, user?.id || '');
  }

  @Post(':id/tap')
  tap(@Param('id') id: string, @Headers() headers: any) {
    const user = auth(headers);
    if (!user) return { error: 'Unauthorized' };
    return this.service.tap(id, user as any);
  }
}
