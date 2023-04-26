import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user-admin.dto';
import { Cookies } from './decorator/get-cookie.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authsService: AuthService) {}

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
}
