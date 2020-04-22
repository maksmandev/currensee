import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';

import { ApiModule } from '../api/api.module';
import { BotService } from './bot.service';
import { TELEGRAM_MODULE, TELEGRAM_TOKEN } from './bot.constants';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [ApiModule, UsersModule],
  providers: [
    BotService,
    {
      provide: TELEGRAM_MODULE,
      useFactory: (configService: ConfigService) => {
        return new TelegramBot(configService.get(TELEGRAM_TOKEN), {
          polling: true,
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class BotModule {}
