import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { API_URL, FLAGS } from './api.constants';
import { CurrencyRate } from './interfaces/currency.interface';

@Injectable()
export class ApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private formatRate(rate: CurrencyRate): string {
    const { ccy, base_ccy: base, buy, sale } = rate;
    return `${FLAGS[ccy]} ${base}:${ccy} | buy: ${buy} | sale: ${sale}`;
  }

  private formatDailyRates(rates: CurrencyRate[]) {
    return rates.map(rate => this.formatRate(rate)).join('\n');
  }

  private async fetchRates(): Promise<CurrencyRate[]> {
    const { data } = await this.httpService
      .get(this.configService.get(API_URL))
      .toPromise();
    return data;
  }

  async getDailyRates(): Promise<string> {
    const data = await this.fetchRates();
    return this.formatDailyRates(data);
  }

  async getRateByKey(key: string): Promise<string> {
    const data = await this.fetchRates();
    return this.formatRate(data.find(item => item.ccy === key));
  }
}
