import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUploadedFileDto } from './dto/create-uploaded-file.dto';
import { UpdateUploadedFileDto } from './dto/update-uploaded-file.dto';

@Injectable()
export class UploadedFileService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateUploadedFileDto) {
    const res =
      await this.prisma.uploadedFile.create({
        data: {
          id: dto.id,
          title: dto.name,
          postfix: dto.type,
          fileCategory: dto.category,
        },
      });
    return res;
  }

  findAll() {
    return `This action returns all uploadedFile`;
  }

  findOne(id: string) {
    return `This action returns a #${id} uploadedFile`;
  }

  update(
    id: string,
    updateUploadedFileDto: UpdateUploadedFileDto,
  ) {
    return `This action updates a #${id} uploadedFile`;
  }

  remove(id: string) {
    return `This action removes a #${id} uploadedFile`;
  }
}
