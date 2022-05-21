import { Injectable } from '@nestjs/common';
import { Role } from 'expecto-patronum-common';
import { UpdateUserDto } from 'src/generatedDtos/user/dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

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
  async getUsersByType(role: Role) {
    return await this.prisma.user.findMany({
      where: { role: role },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        Address: true,
      },
    });
  }
}
