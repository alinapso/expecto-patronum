import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import Expenses from 'expecto-patronum-common/entities/expenses';
export class CreateSponsoredEventDto {
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
