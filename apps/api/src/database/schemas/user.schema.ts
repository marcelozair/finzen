import { DataTypes } from 'sequelize';
import { Profile } from './profile.schema';
import { Table, Column, Model, HasMany, DataType, HasOne, ForeignKey, BelongsTo } from 'sequelize-typescript';

export enum EnumProvider {
  GOOGLE = 'google',
  LOCAL = 'local',
}

const EnumProviderType = DataType.ENUM(...Object.values(EnumProvider));

@Table({
  tableName: 'users',
})
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ allowNull: true })
  picture: string;

  @Column({ allowNull: true, type: DataTypes.DATE, field: 'last_login' })
  lastLogin: Date;

  @Column({
    defaultValue: EnumProvider.GOOGLE,
    type: EnumProviderType
  })
  provider: EnumProvider;

  @ForeignKey(() => Profile)
  @Column({
    field: 'profile_id',
    allowNull: true,
  })
  profileId: number;

  @BelongsTo(() => Profile)
  profile: Profile;

  @HasMany(() => Profile)
  profiles: Profile[];
}
