import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  Hello(): string {
    return this.appService.Hello();
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}
