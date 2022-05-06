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
import { SponsoredService } from './sponsored.service';
import { CreateSponsoredDto } from './dto/create-sponsored.dto';
import { UpdateSponsoredDto } from './dto/update-sponsored.dto';
import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  AdminGuard,
  JwtGuard,
} from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('sponsored')
@ApiTags('Sponsored')
export class SponsoredController {
  constructor(
    private readonly sponsoredService: SponsoredService,
  ) {}
  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() dto: CreateSponsoredDto) {
    const sponsered =
      await this.sponsoredService.create(dto);
    return sponsered;
  }

  @UseGuards(AdminGuard)
  @Get()
  @ApiOperation({
    summary: 'Returns all Sponsered, admin only',
  })
  findAll() {
    console.log('request came in');
    return this.sponsoredService.findAll();
  }
  @Get('have')
  @ApiOperation({
    summary:
      'Returns all Sponsered that have patron, admin get all, patron only get there on',
  })
  getSponsered(@GetUser() user: User) {
    if (user.role == 'ADMIN')
      return this.sponsoredService.getSponsered();
    return this.sponsoredService.getSponseredByPatron(
      user,
    );
  }
  @ApiOperation({
    summary:
      'Returns all Sponsered without patron',
  })
  @Get('not')
  getNonSponsered() {
    return this.sponsoredService.getNotSponsered();
  }
  @Get(':id')
  @ApiOperation({
    summary: 'Returns Sponsered By ID',
  })
  findOne(
    @GetUser() user: User,
    @Param('id') id: string,
  ) {
    if (user.role == 'ADMIN')
      return this.sponsoredService.findOne(+id);
    return this.sponsoredService.findOneWithPatron(
      user,
      +id,
    );
  }
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateSponsoredDto: UpdateSponsoredDto,
  ) {
    return this.sponsoredService.update(
      +id,
      updateSponsoredDto,
    );
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sponsoredService.remove(+id);
  }
}
