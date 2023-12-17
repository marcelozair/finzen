import { User } from './schemas/user.schema';
import { Bank } from './schemas/bank.schema';
import { Sequelize } from 'sequelize-typescript';
import { Wallet } from './schemas/wallet.schema';
import { BankPlace } from './schemas/bankPlace.schema';
import { Transaction } from './schemas/transactions.schema';
import { TransactionPlace } from './schemas/transactionPlace.schema';
import { Profile } from './schemas/profile.schema';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DATABASE_HOST as string,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
      });
      sequelize.addModels([
        User,
        Bank,
        Wallet,
        Profile,
        BankPlace,
        Transaction,
        TransactionPlace,
      ]);
      await sequelize.sync({ force: true });
      return sequelize;
    },
  },
];
