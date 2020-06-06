import {
  Module,
  DynamicModule,
  Global,
  OnModuleDestroy,
  Inject,
} from '@nestjs/common';
import { PgPubSubService } from './pg-pubsub.service';
import {
  PG_PUBSUB_OPTIONS_TOKEN,
  PG_PUBSUB_CONNECTION_TOKEN,
} from './constants';
import {
  PgPubSubOptions,
  PgPubSubAsyncOptions,
  PgSubscriber,
} from './interfaces';
import {
  createAsyncProviders,
  createOptionsProviders,
} from './pg-pubsub.providers';
import { connectionFactory } from './pg-pubsub-connection.provider';
import { ModuleRef } from '@nestjs/core';

@Global()
@Module({
  providers: [PgPubSubService, connectionFactory],
  exports: [PgPubSubService, connectionFactory],
})
export class PgPubSubCoreModule implements OnModuleDestroy {
  constructor(
    @Inject(PG_PUBSUB_OPTIONS_TOKEN)
    private readonly options: PgPubSubOptions,
    private readonly moduleRef: ModuleRef,
  ) {}

  /**
   * Registers a configured PgPubSubModule Module for import into the current module
   */
  static register(options: PgPubSubOptions): DynamicModule {
    return {
      module: PgPubSubCoreModule,
      providers: createOptionsProviders(options),
    };
  }

  /**
   * Registers a configured PgPubSubModule Module for import into the current module
   * using dynamic options (factory, etc)
   */
  static registerAsync(options: PgPubSubAsyncOptions): DynamicModule {
    return {
      module: PgPubSubCoreModule,
      providers: createAsyncProviders(options),
      imports: options.imports || [],
    };
  }

  onModuleDestroy(): void {
    if (!this.options.keepAlive) {
      const pgSubscriber = this.moduleRef.get<PgSubscriber>(
        PG_PUBSUB_CONNECTION_TOKEN,
      );
      pgSubscriber.close();
    }
  }
}
