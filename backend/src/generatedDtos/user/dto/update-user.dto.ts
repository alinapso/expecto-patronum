import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  email?: string;
  hash?: string;
  firstName?: string;
  lastName?: string;
  Address?: string;
  @ApiProperty({ enum: Role })
  role?: Role;
}
