import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUploadedFileDto } from './dto/create-uploaded-file.dto';
import { UpdateUploadedFileDto } from './dto/update-uploaded-file.dto';
import { unlink } from 'node:fs';
import {
  UploadedFile,
  User,
} from 'expecto-patronum-common';
import { NotFoundError } from 'rxjs';

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
    console.log(res);
    return res;
  }

  findAll() {
    return `This action returns all uploadedFile`;
  }

  async findOne(id: string) {
    const uploadedFile =
      await this.prisma.uploadedFile.findFirst({
        where: { id: id },
      });
    if (uploadedFile) return uploadedFile;
    throw new NotFoundException(
      'the file doesnt exist',
    );
  }

  update(
    id: string,
    updateUploadedFileDto: UpdateUploadedFileDto,
  ) {
    return `This action updates a #${id} uploadedFile`;
  }

  async remove(id: string) {
    const file = await this.findOne(id);
    if (!file) return 'this file doesnt exist';
    const deleteFile =
      await this.prisma.uploadedFile.delete({
        where: { id: id },
      });
    unlink(
      `files/${file.id}.${file.postfix}`,
      (err) => {
        if (err) throw err;
        console.log('path/file.txt was deleted');
      },
    );
    return deleteFile;
  }
}
