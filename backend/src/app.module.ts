import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SponsoredModule } from './sponsored/sponsored.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UploadedFileModule } from './uploaded-file/uploaded-file.module';
import { PrismaModule } from './prisma/prisma.module';
import { SponsoredEventsModule } from './sponsored-events/sponsored-events.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './files',
    }),
    AuthModule,
    UserModule,
    SponsoredModule,
    PrismaModule,
    SponsoredEventsModule,
    UploadedFileModule,
    TransactionsModule,
  ],
})
export class AppModule {}
