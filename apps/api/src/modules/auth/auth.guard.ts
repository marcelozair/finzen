import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const user =  await this.jwtService.verifyAsync(token, {
        secret: '1dEIHe12tCtO',
      });

      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const { authorization } = request.headers as { authorization: string };

    const [type, token] = authorization ? authorization.split(' ') : [];
    return type === 'Bearer' ? token : undefined;
  }

}