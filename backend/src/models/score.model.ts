import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';
import { Round } from './round.model';

@Table({ tableName: 'scores' })
export class Score extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId!: string;

  @ForeignKey(() => Round)
  @Column({ type: DataType.UUID })
  roundId!: string;

  @Column({ defaultValue: 0 })
  taps!: number;

  @Column({ defaultValue: 0 })
  points!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Round)
  round!: Round;
}
