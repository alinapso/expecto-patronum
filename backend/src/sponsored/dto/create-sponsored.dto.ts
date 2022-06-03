import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateSponsoredDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  middleName: string;
  @IsString()
  @IsOptional()
  fatherName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsDateString()
  @IsNotEmpty()
  birthDate: Date;
  @IsString()
  @IsNotEmpty()
  placeOfBirth: string;
  @IsOptional()
  @IsString()
  uploadedFileId: string;
  @IsString()
  description: string;
}
