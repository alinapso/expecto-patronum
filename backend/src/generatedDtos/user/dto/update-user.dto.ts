import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'expecto-patronum-common';
export class UpdateUserDto {
  email?: string;
  hash?: string;
  firstName?: string;
  lastName?: string;
  Address?: string;
  @ApiProperty({ enum: Role })
  role?: Role;
}
