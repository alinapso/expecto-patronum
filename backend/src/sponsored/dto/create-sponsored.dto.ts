import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Timestamp } from 'rxjs';
export class CreateSponsoredDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;
  @IsString()
  @IsNotEmpty()
  middle_name: string;
  @IsString()
  @IsOptional()
  father_name: string;
  @IsString()
  @IsNotEmpty()
  last_name: string;
  @IsDate()
  @IsNotEmpty()
  birth_date: Date;
  @IsString()
  @IsNotEmpty()
  place_of_birth: string;
}
