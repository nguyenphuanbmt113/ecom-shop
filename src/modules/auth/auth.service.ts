import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user-admin.dto';
import { RegisterDto } from './dto/register.dto';
import { MailService } from '../mail/mail.service';
import * as crypto from 'crypto';
export interface TokenPayload {
  userId: number;
  name: string;
  role: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private mailService: MailService,
  ) {}

  async createAccessToken(payloadToken: TokenPayload) {
    const payload = {
      ...payloadToken,
    };
    const token = await this.jwtService.sign(payload);
    return token;
  }

  async createRefreshToken(payloadToken: TokenPayload) {
    const payload = {
      ...payloadToken,
    };
    const token = await this.jwtService.sign(payload);
    return token;
  }

  async login(data: LoginUserDto) {
    const user = await this.usersService.findByEmail(data.email);
    const isPasswordMatching = await bcrypt.compare(
      data.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    const access_token = await this.createAccessToken({
      userId: user.id,
      name: user.name,
      role: user.role,
    });
    user.refreshToken = access_token;
    await user.save();
    return {
      access_token,
      user,
    };
  }

  async register(data: RegisterDto) {
    const existsEmail = await this.usersService.findByEmail(data.email);
    if (existsEmail) {
      throw new HttpException(
        'User with that email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const createdUser = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });
    return createdUser;
  }

  async refreshToken(refresh_token: any) {
    const user = await this.jwtService.verify(refresh_token);
    console.log('user:', user);
    const findUser = await this.usersService.getOneByIdAndRefreshToken(
      user.userId,
      refresh_token,
    );
    if (!findUser) {
      throw new NotFoundException();
    }
    const payload = {
      userId: user.id,
      name: user.name,
      role: user.role,
    };
    const new_Token = await this.createRefreshToken(payload);
    return {
      new_access_token: new_Token,
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    console.log('user:', user);
    if (!user) {
      return new NotFoundException();
    }
    console.log('process.env.DATABASE_USER:', process.env.EMAIL_NAME);

    const password_token = await user.createPasswordToken();
    console.log('password_token:', password_token);
    await user.save();
    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/auth/reset-password/${password_token}>Click here</a>`;
    await this.mailService.sendUserConfirmation(user, html);
    return 'okela';
  }

  async resetPassword(password_token: string, newPassword: string) {
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(password_token)
      .digest('hex');

    const user = await this.usersService.getOneByPasswordToken(
      passwordResetToken,
    );
    if (!user) {
      throw new NotFoundException();
    }
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordchangedAt = Date.now();
    user.passwordResetExpire = undefined;
    await user.save();
  }
}
