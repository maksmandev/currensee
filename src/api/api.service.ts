import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getRate() {
    const { data } = await this.httpService
      .get(this.configService.get('API_URL'))
      .toPromise();
    return data;
  }
}
