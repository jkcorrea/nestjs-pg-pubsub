import { PG_PUBSUB_CONNECTION_TOKEN } from './constants';
import { PgPubSubService } from './pg-pubsub.service';
import { PgSubscriber } from './interfaces';

export const connectionFactory = {
  provide: PG_PUBSUB_CONNECTION_TOKEN,
  useFactory: (pgPubSubService: PgPubSubService): PgSubscriber => {
    return pgPubSubService.getPgSubscriber();
  },
  inject: [PgPubSubService],
};
