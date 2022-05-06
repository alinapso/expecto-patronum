import { Injectable } from '@nestjs/common';
import { CreateSponsoredDto } from './dto/create-sponsored.dto';
import { UpdateSponsoredDto } from './dto/update-sponsored.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'expecto-patronum-common';

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

  async findAll() {
    return await this.prisma.sponsored.findMany({
      include: {
        patron: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
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
  async getSponseredByPatron(user: User) {
    const sponsored =
      await this.prisma.sponsored.findMany({
        where: {
          patronId: user.id,
        },
        include: {
          SponsoredEvents: true,
        },
      });
    return sponsored;
  }
  async getSponsered() {
    const sponsored =
      await this.prisma.sponsored.findMany({
        where: {
          NOT: {
            patronId: null,
          },
        },
        include: {
          SponsoredEvents: true,
          patron: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });
    return sponsored;
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

  remove(id: number) {
    return `This action removes a #${id} sponsored`;
  }
}
