import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SponsoredEventsService } from './sponsored-events.service';
import { CreateSponsoredEventDto } from './dto/create-sponsored-event.dto';
import { UpdateSponsoredEventDto } from './dto/update-sponsored-event.dto';
import { JwtGuard } from 'src/auth/guard';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
import { User } from 'expecto-patronum-common';
@UseGuards(JwtGuard)
@ApiTags('Sponsored Events')
@Controller('sponsored-events')
export class SponsoredEventsController {
  constructor(
    private readonly sponsoredEventsService: SponsoredEventsService,
  ) {}

  @Post()
  create(
    @Body()
    createSponsoredEventDto: CreateSponsoredEventDto,
  ) {
    return this.sponsoredEventsService.create(
      createSponsoredEventDto,
    );
  }

  @Get()
  findAll() {
    return this.sponsoredEventsService.findAll();
  }
  @Get('me')
  getAllByUser(@GetUser() user: User) {
    return this.sponsoredEventsService.getAllEventsByUser(
      user,
    );
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sponsoredEventsService.findOne(
      id,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateSponsoredEventDto: UpdateSponsoredEventDto,
  ) {
    return this.sponsoredEventsService.update(
      id,
      updateSponsoredEventDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sponsoredEventsService.remove(id);
  }
}
