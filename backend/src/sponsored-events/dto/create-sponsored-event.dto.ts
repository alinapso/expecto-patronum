import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
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
}
