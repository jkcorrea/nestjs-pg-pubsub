import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * A simple callback we can mock/spy on in unit tests.
   *
   * @param payload
   */
  foo(payload: any) {
    console.log(`received payload!\n${payload}`);
  }
}
