import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Cookies } from './decorator/get-cookie.decorator';
import { LoginUserDto } from './dto/login-user-admin.dto';
import { RegisterDto } from './dto/register.dto';
import { EmailConfirmationService } from './emailConfirmation.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authsService: AuthService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(
    @Body() data: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const res = await this.authsService.login(data);
    response.cookie('refresh_token', res.access_token);
    return res;
  }

  @Post('register')
  async register(@Body() data: RegisterDto) {
    console.log('data:', data);
    return this.authsService.register(data);
  }

  @Post('refresh_token')
  async refreshToken(@Cookies() refresh_token: any) {
    return this.authsService.refreshToken(refresh_token);
  }

  @Post('forgot-password')
  async ForgotPassword(@Body('email') email: string) {
    return this.authsService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Param('password_token') password_token: string,
    @Body('new-new_password') new_password: string,
  ) {
    return this.authsService.resetPassword(password_token, new_password);
  }

  @Post('email/register')
  @HttpCode(HttpStatus.OK)
  async register_email(@Body() data: RegisterDto) {
    const user = await this.authsService.register(data);
    await this.emailConfirmationService.sendVerificationLink(data.email);
    return user;
  }

  @Get('confirm-emails')
  async confirm(@Query('token') token: string) {
    console.log('token:', token);
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      token,
    );
    await this.emailConfirmationService.confirmEmail(email);
    return 'okela confirm email';
  }
}
