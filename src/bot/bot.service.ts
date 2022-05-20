import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
import { Cron } from '@nestjs/schedule';

import { ApiService } from '../api/api.service';
import { UsersService } from '../users/users.service';
import { Message } from './interfaces/message.interface';
import {
  TELEGRAM_MODULE,
  USD_COMMAND,
  EUR_COMMAND,
  BTC_COMMAND,
  START_COMMAND,
} from './bot.constants';

@Injectable()
export class BotService {
  constructor(
    @Inject(TELEGRAM_MODULE) private readonly telegramBot: TelegramBot,
    private readonly apiService: ApiService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  private getCommand(message: string): string {
    return this.configService.get<string>(message);
  }

  @Cron('0 30 10 * * 1-5')
  async sendDaily() {
    const data = await this.apiService.getDailyRates();
    const users = await this.usersService.findAll();
    users.forEach(user => {
      this.telegramBot.sendMessage(user.id, data);
    });
  }

  async onModuleInit() {
    this.telegramBot.on('message', async (message: Message) => {
      const {
        text,
        chat: { id },
        from: {
          id: userId,
          username,
          first_name: firstName,
          last_name: lastName,
        },
      } = message;

      const command = text.toUpperCase();
      let data: string;

      switch (command) {
        case this.getCommand(START_COMMAND):
          data =
            '👋 Hi, please send me one of currencies (usd 🇺🇸, eur 🇪🇺, btc 🌐)';
          await this.usersService.create({
            id: userId,
            username,
            firstName,
            lastName,
          });
          break;
        case this.getCommand(USD_COMMAND):
          data = await this.apiService.getRateByKey(command);
          break;
        case this.getCommand(EUR_COMMAND):
          data = await this.apiService.getRateByKey(command);
          break;
        case this.getCommand(BTC_COMMAND):
          data = await this.apiService.getRateByKey(command);
          break;
        default:
          data = `Please, send existing currency 🇺🇸 🇪🇺 🌐`;
      }
      this.telegramBot.sendMessage(id, data).catch(console.error);
    });

    this.telegramBot.on('polling_error', error => console.error(error));
  }
}
