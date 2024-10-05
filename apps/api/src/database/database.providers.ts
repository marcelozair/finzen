import { User } from './schemas/user.schema';
import { Bank } from './schemas/bank.schema';
import { Sequelize } from 'sequelize-typescript';
import { Wallet } from './schemas/wallet.schema';
import { Profile } from './schemas/profile.schema';
import { Transaction } from './schemas/transaction.schema';
import { BankLocation } from './schemas/bank-location.schema';
import { TransactionLocation } from './schemas/transaction-location.schema';
import { WalletType } from './schemas/wallet-types.schema';

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
        logging: false,
      });
      sequelize.addModels([
        User,
        Bank,
        Wallet,
        WalletType,
        Profile,
        Transaction,
        BankLocation,
        TransactionLocation,
      ]);
      await sequelize.sync({ force: false });
      return sequelize;
    },
  },
];
