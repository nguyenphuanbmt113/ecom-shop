import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const refresh_token = request.cookies?.['refresh_token'];
    if (!refresh_token) {
      throw new UnauthorizedException();
    }
    return refresh_token;
  },
);
