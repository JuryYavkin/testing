import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoundController } from './round.controller';
import { RoundService } from './round.service';
import { Round } from '../models/round.model';
import { Score } from '../models/score.model';
import { User } from '../models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Round, Score, User])],
  controllers: [RoundController],
  providers: [RoundService],
})
export class RoundModule {}
