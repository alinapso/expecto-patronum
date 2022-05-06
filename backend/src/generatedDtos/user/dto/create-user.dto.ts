import { Role } from 'expecto-patronum-common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  email: string;
  hash: string;
  firstName?: string;
  lastName?: string;
  Address?: string;
  @ApiProperty({ enum: Role })
  role?: Role;
}
