import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { ProfileModule } from './modules/profile/profile.module';
import { BcryptService } from './services/bcrypt.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
      isGlobal: true,
    }),

    DatabaseModule,
    UserModule,
    AuthModule,
    WalletModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [BcryptService],
  exports: [BcryptService]
})
export class AppModule {}
