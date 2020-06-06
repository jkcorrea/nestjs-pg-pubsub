import { Module } from '@nestjs/common';
import { PgPubSubModule } from '../../lib';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PgPubSubModule.registerAsync({
      useFactory: () => ({
        host: '0.0.0.0',
        port: 5433,
        user: 'root',
        password: 'root',
        database: 'test',
        listenOptions: {
          retryLimit: 2,
          retryInterval: 500,
        },
      }),
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class ApplicationModule {}
