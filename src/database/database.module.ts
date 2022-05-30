import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config';

const API_KEY = '123456';
const API_KEY_PROD = 'PROD_123456';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { user, password, host, port, dbName } = configService.postgres;
        return {
          type: 'postgres',
          username: user,
          host: host,
          database: dbName,
          password: password,
          port: port,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { user, password, host, port, dbName } = configService.postgres;
        const client = new Client({
          user: user,
          host: host,
          database: dbName,
          password: password,
          port: port,
        });
        await client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
