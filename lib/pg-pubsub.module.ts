import { DynamicModule, Module } from '@nestjs/common';
import { PgPubSubAsyncOptions, PgPubSubOptions } from './interfaces';

import { PgPubSubCoreModule } from './pg-pubsub-core.module';

@Module({})
export class PgPubSubModule {
  static register(options: PgPubSubOptions): DynamicModule {
    return {
      module: PgPubSubModule,
      imports: [PgPubSubCoreModule.register(options)],
    };
  }

  static registerAsync(options: PgPubSubAsyncOptions): DynamicModule {
    return {
      module: PgPubSubModule,
      imports: [PgPubSubCoreModule.registerAsync(options)],
    };
  }
}
