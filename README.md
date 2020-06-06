# PG PubSub for NestJS

<p align="center">
  <a href="https://www.npmjs.com/package/nestjs-pg-pubsub"><img src="https://img.shields.io/npm/v/nestjs-pg-pubsub.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/nestjs-pg-pubsub"><img src="https://img.shields.io/npm/l/nestjs-pg-pubsub.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/package/nestjs-pg-pubsub"><img src="https://img.shields.io/npm/dm/nestjs-pg-pubsub.svg" alt="NPM Downloads" /></a>
  <a href="https://travis-ci.org/jkcorrea/nestjs-pg-pubsub"><img src="https://circleci.com/gh/jkcorrea/nestjs-pg-pubsub.svg?style=svg" alt="CircleCI" /></a>
  <a href="https://travis-ci.org/jkcorrea/nestjs-pg-pubsub"><img src="https://img.shields.io/jkcorrea/nestjs-pg-pubsub/nest/master.svg?label=linux" alt="Linux" /></a>
  <a href="https://coveralls.io/github/jkcorrea/nestjs-pg-pubsub?branch=master"><img src="https://coveralls.io/repos/github/jkcorrea/nestjs-pg-pubsub/badge.svg?branch=master#5" alt="Coverage" /></a>
  <a href="https://paypal.me/jkcorrea"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
</p>

A simple [NestJS](https://nestjs.com/) module wrapping [pg-listen](https://github.com/andywer/pg-listen).

## Installation

```bash
# yarn
$ yarn add -D nestjs-pg-pubsub

# npm
$ npm i --save nestjs-pg-pubsub
```

## Usage

First, register the module for your app (e.g. `app.module.ts`)

```ts
@Module({
  imports: [
    PgPubSubModule.register({
      host: '0.0.0.0',
      port: 5433,
      user: 'root',
      password: 'root',
      database: 'test',
    }),
  ],
  providers: [AppGateway, AppService],
  controllers: [AppController],
})
export class ApplicationModule {}
```

Inject PgSubscriber in your service, and listen in on a channel:

```ts
import { Injectable } from '@nestjs/common';
import { InjectPgSubscriber, PgSubscriber } from 'nestjs-pg-pubsub';

@Injectable()
export class FooService {
  constructor(
    @InjectPgSubscriber() private readonly pgSubscriber: PgSubscriber,
    private readonly appService: AppService,
  ) {
    // IMPORTANT - need this line to respond to events
    this.pgSubscriber.listenTo('my-channel');
    this.pgSubscriber.notifications.on('my-channel', (payload) => {
      // Do something with the payload
      // or don't! I don't care!
      console.log(payload.message, payload.timestamp);
    });
  }
}
```

And send a message to it from some other service/controller/thing:

```ts
@Controller()
export class BarController {
  constructor(
    @InjectPgSubscriber
    private readonly pgSubscriber: PgSubscriber,
  ) {}

  @Get('foobar')
  foobar() {
    this.pgSubscriber.notify('my-channel', {
      message: 'hallo :3',
      timestamp: Date.now(),
    });
  }
}
```

## API

Once you've injected `PgSubscriber`, you can pretty much follow the API for [pg-listen](https://github.com/andywer/pg-listen).

However, you don't need to `.connect()` / `.close()`, as this module takes care of that for you.

## Debugging

pg-listen uses the `DEBUG=pg-listen:*` namespace for debugging, might be helpful!

## Stay in touch

- Author - [Jacob Correa](https://github.com/jkcorrea)
- Twitter - [@jkcorrea\_](https://twitter.com/jkcorrea_)

## License

[MIT licensed](LICENSE).
