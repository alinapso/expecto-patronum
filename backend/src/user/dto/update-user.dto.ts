import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  firstName?: string;
  lastName?: string;
  Address?: string;
}
export class UpdateUserAdminDto {
  email?: string;
  hash?: string;
  firstName?: string;
  lastName?: string;
  Address?: string;
  @ApiProperty({ enum: Role })
  role?: Role;
}
