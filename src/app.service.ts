import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('MONGO') private database: Db,
  ) {}

  Hello(): string {
    return `Hello Human!`;
  }

  nuevoEndpoint(): string {
    return `soy nuevo`;
  }

  async getTasks() {
    const taskCollection = this.database.collection('tasks');
    const tasks = await taskCollection.find().toArray();
    return tasks;
  }
}
