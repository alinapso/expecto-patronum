import { IsOptional } from 'class-validator';
import { PaginationDto } from './pagination';
const defualtPerPageCount = 1;
export class ApiCallDto<T> {
  @IsOptional()
  body: T;
  @IsOptional()
  pagination: PaginationDto;
  @IsOptional()
  filter: any;
  @IsOptional()
  orderBy: any;
}

export function getParams(
  apiCall: ApiCallDto<any>,
) {
  const pagination = getPagination(apiCall);
  const orderBy = getOrderBy(apiCall);
  const filter = getFilter(apiCall);

  return { ...pagination, ...orderBy, ...filter };
}
export function getPagination(
  apiCall: ApiCallDto<any>,
) {
  if (apiCall.pagination) {
    console.log(apiCall.pagination);
    const pageCount = apiCall.pagination
      .perPageCount
      ? apiCall.pagination.perPageCount
      : defualtPerPageCount;
    const skip =
      (apiCall.pagination.page - 1) * pageCount;

    console.log('skip : ', skip);
    return {
      skip: skip,
      take: apiCall.pagination.perPageCount,
    };
  } else
    return { skip: 0, take: defualtPerPageCount };
}
export function getOrderBy(
  apiCall: ApiCallDto<any>,
) {
  return apiCall.orderBy
    ? { orderBy: apiCall.orderBy }
    : undefined;
}
export function getFilter(
  apiCall: ApiCallDto<any>,
) {
  return apiCall.filter
    ? { where: apiCall.filter }
    : undefined;
}
