import { Injectable } from '@nestjs/common';
import { User } from 'expecto-patronum-common';
import {
  ApiCallDto,
  calcPageCount,
  getFilter,
  getOrderBy,
  getPagination,
} from 'src/Dto/apiCall';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadedFileService } from 'src/uploaded-file/uploaded-file.service';

@Injectable()
export class ExpensesService {
  constructor(
    private prisma: PrismaService,
    private uploadedFileService: UploadedFileService,
  ) {}
  async getAllExpensesByPatron(
    user: User,
    id: string,
    apiCall: ApiCallDto<any>,
    startDate: string,
    endDate: string,
  ) {
    const pagination = getPagination(apiCall);
    let orderBy = getOrderBy(apiCall);
    orderBy = orderBy
      ? orderBy
      : {
          orderBy: {
            sponsoredEvent: {
              eventDate: 'desc',
            },
          },
        };

    const { eventDate } = orderBy.orderBy;

    if (eventDate) {
      orderBy.orderBy = {
        sponsoredEvent: {
          eventDate: eventDate,
        },
      };
    }

    const filter = {
      sponsoredEvent: {
        sponsored: {
          id: id,
        },
        ...(endDate &&
          startDate && {
            eventDate: {
              lte: new Date(startDate),
              gte: new Date(endDate),
            },
          }),
      },
    };
    console.log(filter);
    const result = await this.prisma.$transaction(
      [
        this.prisma.expenses.aggregate({
          _count: true,
          _avg: {
            sum: true,
          },
          where: filter,
        }),
        this.prisma.expenses.findMany({
          include: {
            sponsoredEvent: {
              select: {
                id: true,
                eventDate: true,
              },
            },
          },
          ...orderBy,
          ...pagination,
          where: filter,
        }),
      ],
    );
    const newResults = result[1].map((res) => {
      const { sponsoredEvent, ...rest } = res;
      return {
        ...rest,
        eventDate: sponsoredEvent.eventDate,
        sponsoredEventId: sponsoredEvent.id,
      };
    });
    return {
      count: result[0]._count,
      sum: result[0]._count * result[0]._avg.sum,
      currentPage: apiCall.pagination
        ? apiCall.pagination.page
        : 1,
      pageTotal: calcPageCount(result[0]?._count),
      data: newResults,
    };
  }
  async remove(id: string) {
    console.log(id);
    const deletedExpense =
      await this.prisma.expenses.findFirst({
        where: {
          id: id,
        },
      });
    console.log(deletedExpense);
    const deleteRes =
      await this.uploadedFileService.remove(
        deletedExpense.uploadedFileId,
      );
    console.log('deleteRes', deleteRes);
    return this.prisma.expenses.delete({
      where: {
        id: id,
      },
    });
  }
}
