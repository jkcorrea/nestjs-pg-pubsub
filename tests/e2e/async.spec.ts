import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { Server } from 'http';
import * as request from 'supertest';

import { ApplicationModule } from '../src/pg-pubsub-async.module';
import { AppService } from '../src/app.service';

class AppServiceMock {
  async test(payload: any) {
    console.log(payload);
  }
}

describe('PgPubSub', () => {
  let server: Server;
  let app: INestApplication;
  let appService: AppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
      providers: [
        {
          provide: AppService,
          useClass: AppServiceMock,
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    app = module.createNestApplication();
    server = app.getHttpServer();
    await app.init();
  });

  it(`should rebroadcast a message via Pg PubSub`, (done) => {
    const body = {
      message: 'Hello from another world :)!',
      timestamp: Date.now(),
    };

    jest.spyOn(appService, 'foo').mockImplementation((payload: any) => {
      expect(payload).toEqual(body);
      done();
    });

    request(server)
      .post('/sendMessage')
      .set('Accept', 'application/json')
      .send(body)
      .end(() => {});
  });

  afterEach(async () => {
    jest.resetAllMocks();
    await app.close();
  });
});
