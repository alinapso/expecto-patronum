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
  getFilter,
  getOrderBy,
  getPagination,
  getParams,
} from 'src/Dto/apiCall';
import { PrismaClientValidationError } from '@prisma/client/runtime';

@Injectable()
export class SponsoredService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateSponsoredDto) {
    //console.log(dto);
    const res =
      await this.prisma.sponsored.create({
        data: {
          first_name: dto.first_name,
          middle_name: dto.middle_name,
          father_name: dto.father_name,
          last_name: dto.last_name,
          birth_date: dto.birth_date,
          is_active: true,
          patron_id: undefined,
          place_of_birth: dto.place_of_birth,
        },
      });
    return res;
  }

  async getSponsered(
    apiCall: ApiCallDto<any>,
    user: User,
  ) {
    let filter: { where: any } = {
      where: undefined,
    };
    if (user.role == 'PATRON') {
      filter = {
        where: {
          OR: [
            { patron_id: user.id },
            { patron_id: null },
          ],
          ...apiCall.filter,
        },
      };
    } else filter = getFilter(apiCall);
    console.log(apiCall);
    const pagination = getPagination(apiCall);
    const orderBy = getOrderBy(apiCall);
    const result = await this.prisma.$transaction(
      [
        this.prisma.sponsored.aggregate({
          _count: true,
          ...filter,
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
          ...filter,
          ...pagination,
          ...orderBy,
        }),
      ],
    );
    return {
      count: result[0]._count,
      currentPage: apiCall.pagination
        ? apiCall.pagination.page
        : 1,
      pageTotal: calcPageCount(result[0]?._count),
      data: result[1],
    };
  }
  async getNotSponsered() {
    const sponsored =
      await this.prisma.sponsored.findMany({
        where: {
          patron_id: null,
          is_active: true,
        },
        select: {
          id: true,
          first_name: true,
          middle_name: true,
          father_name: true,
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
            patron_id: user.id,
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
      //console.log(e);
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
              patron_id: user.id,
            },
            {
              patron_id: null,
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
