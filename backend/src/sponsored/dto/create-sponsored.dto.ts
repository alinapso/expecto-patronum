import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
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
  @IsDateString()
  @IsNotEmpty()
  birth_date: Date;
  @IsString()
  @IsNotEmpty()
  place_of_birth: string;
}
