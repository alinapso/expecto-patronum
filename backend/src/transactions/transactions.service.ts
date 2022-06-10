import { Injectable } from '@nestjs/common';
import {
  Role,
  User,
} from 'expecto-patronum-common';
import {
  ApiCallDto,
  calcPageCount,
  getFilter,
} from 'src/Dto/apiCall';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}
  create(
    createTransactionDto: CreateTransactionDto,
  ) {
    return 'This action adds a new transaction';
  }

  async findAll(
    user: User,
    apiCall: ApiCallDto<any>,
    startDate: string,
    endDate: string,
  ) {
    let filter: { where: any } = {
      where: {
        ...(endDate &&
          startDate && {
            createdAt: {
              lte: new Date(startDate),
              gte: new Date(endDate),
            },
          }),
      },
    };
    if (user.role == 'PATRON') {
      filter = {
        where: {
          patronId: user.id,
          ...apiCall.filter,
        },
      };
    } else filter = getFilter(apiCall);
    filter.where = {
      ...(endDate &&
        startDate && {
          createdAt: {
            lte: new Date(startDate),
            gte: new Date(endDate),
          },
        }),
      ...filter.where,
    };
    console.log(filter);
    const result = await this.prisma.$transaction(
      [
        this.prisma.transactions.aggregate({
          _count: true,
          _avg: {
            sum: true,
          },
          ...filter,
        }),
        this.prisma.transactions.findMany({
          orderBy: {
            createdAt: 'desc',
          },
          ...filter,
          include: {
            patron: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            Sponsored: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        }),
      ],
    );
    return {
      count: result[0]._count,
      sum: result[0]._count * result[0]._avg.sum,

      currentPage: apiCall.pagination
        ? apiCall.pagination.page
        : 1,
      pageTotal: calcPageCount(result[0]?._count),
      data: result[1],
    };
  }
  async findAllByUser(
    id: string,
    user: User,
    apiCall: ApiCallDto<any>,
    startDate: string,
    endDate: string,
  ) {
    apiCall.filter = { patronId: id };
    return this.findAll(
      user,
      apiCall,
      startDate,
      endDate,
    );
  }
  async findAllBySponsored(
    id: string,
    user: User,
    apiCall: ApiCallDto<any>,
    startDate: string,
    endDate: string,
  ) {
    apiCall.filter = {
      sponsoredId: id,
    };
    return this.findAll(
      user,
      apiCall,
      startDate,
      endDate,
    );
  }
  async findOne(id: string) {
    return await this.prisma.transactions.findFirst(
      {
        where: {
          id: id,
        },
        include: {
          patron: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          Sponsored: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    );
  }

  async update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    return `This action updates a #${id} transaction`;
  }

  async remove(id: string) {
    return await this.prisma.transactions.delete({
      where: {
        id: id,
      },
    });
  }
}
