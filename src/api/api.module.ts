import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiService } from './api.service';

@Module({
  imports: [HttpModule],
  providers: [ApiService, ConfigModule],
  exports: [ApiService],
})
export class ApiModule {}
