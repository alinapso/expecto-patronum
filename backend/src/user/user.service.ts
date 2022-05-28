import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/generatedDtos/user/dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  ApiCallDto,
  calcPageCount,
  getParams,
} from 'src/Dto/apiCall';
import { PrismaClientValidationError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(
    userId: number,
    dto: UpdateUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;
    return user;
  }
  async getUsers(apiCall: ApiCallDto<any>) {
    try {
      const params = getParams(apiCall);
      const result =
        await this.prisma.$transaction([
          this.prisma.user.aggregate({
            _count: true,
            ...params,
          }),
          this.prisma.user.findMany({
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true,
              Address: true,
            },
            ...params,
          }),
        ]);
      return {
        currentPage: apiCall.pagination
          ? apiCall.pagination.page
          : 1,
        pageTotal: calcPageCount(
          result[0]._count,
        ),
        data: result[1],
      };
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
}
