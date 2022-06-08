import { PartialType } from '@nestjs/swagger';
import { CreateSponsoredEventDto } from './create-sponsored-event.dto';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Expenses } from 'expecto-patronum-common';
export class UpdateSponsoredEventDto extends PartialType(
  CreateSponsoredEventDto,
) {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  description: string;
  @IsOptional()
  files: string[];
  @IsDateString()
  @IsNotEmpty()
  eventDate: string;
  @IsString()
  sponsoredId: string;
  @IsOptional()
  expenses: Expenses[];
}
