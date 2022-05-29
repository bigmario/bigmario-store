import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

import { Public } from './auth/decorators/public.decorator';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@ApiTags('Home')
@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  Hello(): string {
    return this.appService.Hello();
  }

  @Public()
  @Get('nuevo')
  newEndpoint(): string {
    return this.appService.nuevoEndpoint();
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}
