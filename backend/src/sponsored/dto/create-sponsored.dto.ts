import {
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
  FatherName: string;
  @IsString()
  @IsNotEmpty()
  last_name: string;
}
