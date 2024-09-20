import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/public-auth.decorator';
import { ApplicationException } from '../exceptions/application.exception';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new ApplicationException(
        401,
        '401',
        'Unauthorized. Token is invalid or missing.',
        'Não autorizado! O Token enviado é inválido ou não foi enviado.',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      request['user'] = payload;

      return true;
    } catch {
      throw new ApplicationException(
        401,
        '401',
        'Unauthorized. Token is invalid or missing.',
        'Não autorizado! O Token enviado é inválido ou não foi enviado.',
      );
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err || !user) {
      throw new ApplicationException(
        401,
        '401',
        'Unauthorized. Token is invalid or missing.',
        'Não autorizado! O Token enviado é inválido ou não foi enviado.',
      );
    }
    return user;
  }
}