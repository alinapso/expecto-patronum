import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateSponsoredDto } from './dto/create-sponsored.dto';
import { UpdateSponsoredDto } from './dto/update-sponsored.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  User,
  UploadedFile,
} from 'expecto-patronum-common';
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
    console.log(dto);
    const res =
      await this.prisma.sponsored.create({
        data: {
          firstName: dto.firstName,
          middleName: dto.middleName,
          fatherName: dto.fatherName,
          lastName: dto.lastName,
          birthDate: new Date(dto.birthDate),
          placeOfBirth: dto.placeOfBirth,
          patronId: undefined,
          description: dto.description,
          isActive: true,
          uploadedFileId: dto.uploadedFileId,
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
            { patronId: user.id },
            { patronId: null },
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
            profilePic: true,
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
          patronId: null,
          isActive: true,
        },
        select: {
          id: true,
          firstName: true,
          middleName: true,
          fatherName: true,
          lastName: true,
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
      //console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
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
    id: string,
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
    id: string,
    updateSponsoredDto: UpdateSponsoredDto,
  ) {
    return `This action updates a #${id} sponsored`;
  }
  async changeStatus(
    id: string,
    status: boolean,
  ) {
    const sponsored =
      await this.prisma.sponsored.update({
        where: {
          id: id,
        },
        data: {
          isActive: status,
        },
      });
    return sponsored;
  }
  remove(id: string) {
    return `This action removes a #${id} sponsored`;
  }
}
