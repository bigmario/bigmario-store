import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}

  Hello(): string {
    const apiKey = this.config.get<string>('API_KEY');
    const dbName = this.config.get<string>('DATABASE_NAME');
    return `Hello Mario! with token: ${apiKey} and DB: ${dbName}`;
  }
}
