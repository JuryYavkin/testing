import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Round } from '../models/round.model';
import { Score } from '../models/score.model';
import { User, Role } from '../models/user.model';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class RoundService {
  constructor(
    @InjectModel(Round) private roundModel: typeof Round,
    @InjectModel(Score) private scoreModel: typeof Score,
    @InjectModel(User) private userModel: typeof User,
    private sequelize: Sequelize,
  ) {}

  async list() {
    return this.roundModel.findAll({ order: [['start', 'DESC']] });
  }

  async create(user: User) {
    if (user.role !== Role.ADMIN) throw new ForbiddenException();
    const start = new Date(Date.now() + Number(process.env.COOLDOWN_DURATION || 0) * 1000);
    const end = new Date(start.getTime() + Number(process.env.ROUND_DURATION || 0) * 1000);
    return this.roundModel.create({ start, end });
  }

  async info(id: string, userId: string) {
    const round = await this.roundModel.findByPk(id, { include: [Score] });
    if (!round) throw new NotFoundException();
    const userScore = await this.scoreModel.findOne({ where: { roundId: id, userId } });
    const winner = round.scores.sort((a, b) => b.points - a.points)[0];
    return {
      id: round.id,
      start: round.start,
      end: round.end,
      totalScore: round.totalScore,
      winner: winner ? { username: (await winner.$get('user')).username, points: winner.points } : null,
      myPoints: userScore?.points || 0,
    };
  }

  private calculatePoints(taps: number): number {
    const bonus = Math.floor(taps / 11) * 10;
    return taps + bonus;
  }

  async tap(id: string, user: User) {
    const round = await this.roundModel.findByPk(id);
    if (!round) throw new NotFoundException();
    const now = new Date();
    if (now < round.start || now > round.end) throw new ForbiddenException('Round not active');
    return this.sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE }, async (t) => {
      const [score] = await this.scoreModel.findOrCreate({ where: { roundId: id, userId: user.id }, defaults: { taps: 0, points: 0 }, transaction: t });
      score.taps += 1;
      if (user.role !== Role.NIKITA) {
        score.points = this.calculatePoints(score.taps);
        round.totalScore += 1;
      }
      await score.save({ transaction: t });
      await round.save({ transaction: t });
      return { points: score.points };
    });
  }
}
