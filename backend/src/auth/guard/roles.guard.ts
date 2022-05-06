import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context
      .switchToHttp()
      .getRequest();
    const user = request.user;
    if (user.role != Role.ADMIN)
      throw new HttpException(
        'You dont have permissions to make this api call',
        HttpStatus.FORBIDDEN,
      );
    return true;
  }
}
