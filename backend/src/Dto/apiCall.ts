import { IsOptional } from 'class-validator';
import { PaginationDto } from './pagination';
const defualtPerPageCount = 20;
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
export function CreateFromQuery(query: any) {
  const res = new ApiCallDto<any>();
  res.filter = query.filter
    ? JSON.parse(query.filter)
    : undefined;
  res.pagination = query.pagination
    ? JSON.parse(query.pagination)
    : undefined;
  res.orderBy = query.orderBy
    ? JSON.parse(query.orderBy)
    : undefined;
  return res;
}
export function getParams(
  apiCall: ApiCallDto<any>,
) {
  //console.log(apiCall);
  const pagination = getPagination(apiCall);
  const orderBy = getOrderBy(apiCall);
  const filter = getFilter(apiCall);
  return { ...pagination, ...orderBy, ...filter };
}
export function getPagination(
  apiCall: ApiCallDto<any>,
) {
  if (apiCall.pagination) {
    const pageCount = apiCall.pagination
      .perPageCount
      ? apiCall.pagination.perPageCount
      : defualtPerPageCount;
    const skip =
      (apiCall.pagination.page - 1) * pageCount;
    return {
      skip: skip,
      take: pageCount,
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

export function calcPageCount(
  recoredCount: number,
) {
  let pageCount =
    recoredCount / defualtPerPageCount;
  if (recoredCount % defualtPerPageCount > 0)
    pageCount++;
  return Math.floor(pageCount);
}
