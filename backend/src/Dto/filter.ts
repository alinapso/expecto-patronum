import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
const defualtPerPageCount = 4;
export class PaginationDto {
  @IsNumber()
  @IsNotEmpty()
  page: number;
  @IsNumber()
  @IsOptional()
  perPageCount: number;
}
export function getPagination(
  pagination: PaginationDto,
) {
  if (pagination) {
    console.log(pagination);
    const pageCount = pagination.perPageCount
      ? pagination.perPageCount
      : defualtPerPageCount;
    const skip =
      (pagination.page - 1) * pageCount;

    console.log('skip : ', skip);
    return {
      skip: skip,
      take: pagination.perPageCount,
    };
  } else
    return { skip: 0, take: defualtPerPageCount };
}
