import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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

  update(
    id: string,
    updateSponsoredEventDto: UpdateSponsoredEventDto,
  ) {
    return `This action updates a #${id} sponsoredEvent`;
  }

  remove(id: string) {
    return `This action removes a #${id} sponsoredEvent`;
  }
}
