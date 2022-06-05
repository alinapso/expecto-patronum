import { Injectable } from '@nestjs/common';
import { unlink } from 'node:fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadedFileService } from 'src/uploaded-file/uploaded-file.service';
import { CreateSponsoredEventDto } from './dto/create-sponsored-event.dto';
import { UpdateSponsoredEventDto } from './dto/update-sponsored-event.dto';

@Injectable()
export class SponsoredEventsService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateSponsoredEventDto) {
    const newSponsoredEvents =
      await this.prisma.sponsoredEvents.create({
        data: {
          eventDate: new Date(dto.eventDate),
          description: dto.description,
          title: dto.title,
          sponsoredId: dto.sponsoredId,
        },
      });

    dto.files.forEach(async (fileID) => {
      await this.prisma.uploadedFile.update({
        where: {
          id: fileID,
        },
        data: {
          sponsoredEventsId:
            newSponsoredEvents.id,
        },
      });
    });
    return newSponsoredEvents;
  }

  findAll() {
    return `This action returns all sponsoredEvents`;
  }

  findOne(id: string) {
    return `This action returns a #${id} sponsoredEvent`;
  }

  async update(
    id: string,
    dto: UpdateSponsoredEventDto,
  ) {
    const { files, ...pramas } = dto;

    const updatedSponsoredEvent =
      await this.prisma.sponsoredEvents.update({
        where: {
          id: id,
        },
        data: { ...pramas },
      });
    files.forEach(async (fileID) => {
      await this.prisma.uploadedFile.update({
        where: {
          id: fileID,
        },
        data: {
          sponsoredEventsId: id,
        },
      });
    });
    return updatedSponsoredEvent;
  }

  async remove(id: string) {
    const deleteFiles =
      await this.prisma.uploadedFile.findMany({
        where: { sponsoredEventsId: id },
      });
    deleteFiles.forEach((file) => {
      unlink(
        `files/${file.id}.${file.postfix}`,
        (err) => {
          if (err) throw err;
          console.log(
            'path/file.txt was deleted',
          );
        },
      );
    });
    const res =
      await this.prisma.uploadedFile.deleteMany({
        where: {
          sponsoredEventsId: id,
        },
      });
    console.log(res);
    return await this.prisma.sponsoredEvents.delete(
      {
        where: {
          id: id,
        },
      },
    );
  }
}
