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
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1234',
        database: 'finzen',
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
