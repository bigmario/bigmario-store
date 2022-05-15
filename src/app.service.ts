import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
  ) {}

  Hello(): string {
    console.log(this.tasks);
    return `Hello Mario! with token: ${this.apiKey}`;
  }
}
