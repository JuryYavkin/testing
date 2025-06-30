import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Score } from './score.model';

export enum Role {
  PLAYER = 'player',
  ADMIN = 'admin',
  NIKITA = 'nikita',
}

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column
  password!: string;

  @Column({ type: DataType.ENUM(...Object.values(Role)), defaultValue: Role.PLAYER })
  role!: Role;

  @HasMany(() => Score)
  scores!: Score[];
}
