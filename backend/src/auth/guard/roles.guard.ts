import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'expecto-patronum-common';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context
      .switchToHttp()
      .getRequest();
    console.log('AdminGuard');
    const user = request.user;
    console.log(user);
    if (user && user.role != 'ADMIN') {
      throw new HttpException(
        'You dont have permissions to make this api call',
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}
