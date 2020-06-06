import { Provider, Type } from '@nestjs/common';
import { PG_PUBSUB_OPTIONS_TOKEN } from './constants';
import {
  PgPubSubOptions,
  PgPubSubAsyncOptions,
  PgPubSubOptionsFactory,
} from './interfaces';

export function createOptionsProviders(options: PgPubSubOptions): Provider[] {
  return [
    {
      provide: PG_PUBSUB_OPTIONS_TOKEN,
      useValue: options,
    },
  ];
}

const createAsyncOptionsProvider = (
  options: PgPubSubAsyncOptions,
): Provider => {
  if (options.useFactory) {
    return {
      provide: PG_PUBSUB_OPTIONS_TOKEN,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }

  // For useExisting...
  return {
    provide: PG_PUBSUB_OPTIONS_TOKEN,
    useFactory: async (optionsFactory: PgPubSubOptionsFactory) =>
      await optionsFactory.createPgPubSubOptions(),
    inject: [options.useExisting || options.useClass] as Type<
      PgPubSubOptionsFactory
    >[],
  };
};

export const createAsyncProviders = (
  options: PgPubSubAsyncOptions,
): Provider[] => {
  if (options.useExisting || options.useFactory) {
    return [createAsyncOptionsProvider(options)];
  }

  return [
    createAsyncOptionsProvider(options),
    {
      provide: options.useClass as Type<PgPubSubOptionsFactory>,
      useClass: options.useClass as Type<PgPubSubOptionsFactory>,
    },
  ];
};
