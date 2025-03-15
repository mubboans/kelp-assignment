import { Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('life-check')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  apiLifeCheck(): string {
      return this.appService.getApiHealth();
  }

}
