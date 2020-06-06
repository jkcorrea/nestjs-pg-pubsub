import { Injectable, Inject } from '@nestjs/common';
import createPostgresSubscriber from 'pg-listen';
import { PgPubSubOptions, PgSubscriber } from './interfaces';
import { PG_PUBSUB_OPTIONS_TOKEN } from './constants';

@Injectable()
export class PgPubSubService {
  private _pgSubscriber: PgSubscriber;

  constructor(
    @Inject(PG_PUBSUB_OPTIONS_TOKEN)
    private readonly options: PgPubSubOptions,
  ) {
    const { listenOptions: opts, ...connectionConfig } = this.options;
    this._pgSubscriber = createPostgresSubscriber(connectionConfig, opts);
    this._pgSubscriber.connect();
  }

  getPgSubscriber(): PgSubscriber {
    return this._pgSubscriber;
  }
}
