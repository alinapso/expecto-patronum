import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsNotEmpty()
  page: number;
  @IsNumber()
  @IsOptional()
  perPageCount: number;
}
