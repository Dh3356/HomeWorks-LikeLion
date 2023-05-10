import { Injectable } from '@nestjs/common';
import { SendGridService } from '@anchan828/nest-sendgrid';

@Injectable()
export class EmailService {
  constructor(private readonly sendGrid: SendGridService) {}

  async send(email: string) {
    console.log('dsfadfasdfasdf');
    const mail = {
      to: email,
      subject: 'Hello from sendgrid',
      from: 'mju@likelion.org',
      text: 'Hello',
      html: '<h1>Hello<h1>',
    };
    const transport = await this.sendGrid.send(mail);
    console.log(`E-Mail sent to ${mail.to}`);
    return transport;
  }
}
