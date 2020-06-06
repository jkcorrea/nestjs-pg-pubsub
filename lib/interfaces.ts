import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Options as PgListenOptions, Subscriber } from 'pg-listen';
import { ConnectionConfig } from 'pg';

export interface PgPubSubOptions extends ConnectionConfig {
  listenOptions?: PgListenOptions;
}

export interface PgPubSubOptionsFactory {
  createPgPubSubOptions(
    connectionName?: string,
  ): Promise<PgPubSubOptions> | PgPubSubOptions;
}

export interface PgPubSubAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<PgPubSubOptionsFactory>;
  useClass?: Type<PgPubSubOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<PgPubSubOptions> | PgPubSubOptions;
  inject?: any[];
}

export type PgSubscriber = Subscriber;
