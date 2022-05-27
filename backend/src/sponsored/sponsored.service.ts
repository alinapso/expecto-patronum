import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateSponsoredDto } from './dto/create-sponsored.dto';
import { UpdateSponsoredDto } from './dto/update-sponsored.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'expecto-patronum-common';
import {
  ApiCallDto,
  calcPageCount,
  getOrderBy,
  getPagination,
  getParams,
} from 'src/Dto/apiCall';
import { PrismaClientValidationError } from '@prisma/client/runtime';

@Injectable()
export class SponsoredService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateSponsoredDto) {
    console.log(dto);
    const res =
      await this.prisma.sponsored.create({
        data: {
          first_name: dto.first_name,
          middle_name: dto.middle_name,
          FatherName: dto.FatherName,
          last_name: dto.last_name,
          is_active: true,
          patron: undefined,
        },
      });
    return res;
  }

  async getSponsered(apiCall: ApiCallDto<any>) {
    const params = getParams(apiCall);
    console.log(params);
    const result = await this.prisma.$transaction(
      [
        this.prisma.sponsored.aggregate({
          _count: true,
          ...params,
        }),
        this.prisma.sponsored.findMany({
          include: {
            patron: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
          ...params,
        }),
      ],
    );
    return {
      currentPage: apiCall.pagination
        ? apiCall.pagination.page
        : 1,
      pageTotal: calcPageCount(result[0]._count),
      data: result[1],
    };
  }
  async getNotSponsered() {
    const sponsored =
      await this.prisma.sponsored.findMany({
        where: {
          patronId: null,
          is_active: true,
        },
        select: {
          id: true,
          first_name: true,
          middle_name: true,
          FatherName: true,
          last_name: true,
        },
      });
    return sponsored;
  }
  async getSponseredByPatron(
    user: User,
    apiCall: ApiCallDto<any>,
  ) {
    try {
      const pagination = getPagination(apiCall);
      const orderBy = getOrderBy(apiCall);
      const sponsored =
        await this.prisma.sponsored.findMany({
          where: {
            patronId: user.id,
            ...apiCall.filter,
          },
          include: {
            SponsoredEvents: true,
          },
          ...pagination,
          ...orderBy,
        });
      return sponsored;
    } catch (e) {
      if (
        e instanceof PrismaClientValidationError
      ) {
        throw new BadRequestException();
      }
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    const sponsored =
      await this.prisma.sponsored.findMany({
        where: {
          id: id,
        },

        include: {
          patron: {
            select: {
              firstName: true,
              lastName: true,
              id: true,
            },
          },
          SponsoredEvents: true,
        },
      });
    return sponsored;
  }

  async findOneWithPatron(
    user: User,
    id: number,
  ) {
    const sponsored =
      await this.prisma.sponsored.findMany({
        where: {
          AND: [{ id: id }],
          OR: [
            {
              patronId: user.id,
            },
            {
              patronId: null,
            },
          ],
        },

        include: {
          patron: {
            select: {
              firstName: true,
              lastName: true,
              id: true,
            },
          },
          SponsoredEvents: true,
        },
      });
    return sponsored;
  }

  update(
    id: number,
    updateSponsoredDto: UpdateSponsoredDto,
  ) {
    return `This action updates a #${id} sponsored`;
  }
  async changeStatus(
    id: number,
    status: boolean,
  ) {
    const sponsored =
      await this.prisma.sponsored.update({
        where: {
          id: id,
        },
        data: {
          is_active: status,
        },
      });
    return sponsored;
  }
  remove(id: number) {
    return `This action removes a #${id} sponsored`;
  }
}
