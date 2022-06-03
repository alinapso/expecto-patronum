import { Injectable } from '@nestjs/common';
import { CreateSponsoredEventDto } from './dto/create-sponsored-event.dto';
import { UpdateSponsoredEventDto } from './dto/update-sponsored-event.dto';

@Injectable()
export class SponsoredEventsService {
  create(
    createSponsoredEventDto: CreateSponsoredEventDto,
  ) {
    return 'This action adds a new sponsoredEvent';
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
