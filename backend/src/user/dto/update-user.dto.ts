import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName?: string;
  @IsString()
  @IsNotEmpty()
  lastName?: string;
  @IsString()
  @IsNotEmpty()
  Address?: string;
}
export class UpdateUserAdminDto {
  @IsString()
  @IsNotEmpty()
  firstName?: string;
  @IsString()
  @IsNotEmpty()
  lastName?: string;
  @IsString()
  @IsNotEmpty()
  Address?: string;
  @ApiProperty({ enum: Role })
  @IsNotEmpty()
  role?: Role;
}
