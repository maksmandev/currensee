import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { BotModule } from './bot/bot.module';
import { UsersModule } from './users/users.module';
import { DB_HOST } from './db/db.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get(DB_HOST),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),

    ApiModule,
    BotModule,
    ScheduleModule.forRoot(),
    UsersModule,
  ],

  providers: [AppService],
})
export class AppModule {}
