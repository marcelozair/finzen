import { DataTypes } from 'sequelize';
import { Profile } from './profile.schema';
import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';

export enum EnumProvider {
  GOOGLE = 'google',
  LOCAL = 'local',
}

@Table({
  tableName: 'users',
})
export class User extends Model {
  @Column
  sub: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ allowNull: true })
  picture: string;

  @Column({
    defaultValue: EnumProvider.GOOGLE,
    type: DataType.ENUM(...Object.values(EnumProvider)),
  })
  provider: EnumProvider;


  @HasMany(() => Profile)
  profiles: Profile[];
}
