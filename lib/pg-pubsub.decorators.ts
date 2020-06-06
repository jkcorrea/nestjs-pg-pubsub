import { Inject } from '@nestjs/common';
import { PG_PUBSUB_CONNECTION_TOKEN } from './constants';

export const InjectPgSubscriber = (): ParameterDecorator =>
  Inject(PG_PUBSUB_CONNECTION_TOKEN);
