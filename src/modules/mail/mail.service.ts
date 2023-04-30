import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
export interface User {
  email: string;
  name: string;
}
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmation(user: User, content: string) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Fred Foo 👻" <foo@example.com>',
      subject: 'Forgot password!',
      html: content,
    });
  }
  async sendEmailConfirmation(email: string, content: string) {
    await this.mailerService.sendMail({
      to: email,
      from: '"Fred Foo 👻" <foo@example.com>',
      subject: 'Confirm Email!',
      html: content,
    });
  }
}
