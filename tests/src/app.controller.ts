import { Controller, Post, Body } from '@nestjs/common';
import { InjectPgSubscriber, PgSubscriber } from '../../lib';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @InjectPgSubscriber()
    private readonly pgSubscriber: PgSubscriber,
    private readonly appService: AppService,
  ) {
    this.pgSubscriber.listenTo('newMessage');
    this.pgSubscriber.notifications.on('newMessage', (payload) => {
      this.appService.foo(payload);
    });
  }

  @Post('sendMessage')
  async sendMessage(@Body() body: any) {
    await this.pgSubscriber.notify('newMessage', body);
  }
}
