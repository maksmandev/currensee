import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { HttpModule } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [HttpModule],
  providers: [ApiService, ConfigModule],
  controllers: [ApiController],
})
export class ApiModule {}
