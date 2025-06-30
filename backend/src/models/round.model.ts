import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Score } from './score.model';

@Table({ tableName: 'rounds' })
export class Round extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id!: string;

  @Column({ type: DataType.DATE })
  start!: Date;

  @Column({ type: DataType.DATE })
  end!: Date;

  @Column({ defaultValue: 0 })
  totalScore!: number;

  @HasMany(() => Score)
  scores!: Score[];
}
