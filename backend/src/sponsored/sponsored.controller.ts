import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
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
import { User } from 'expecto-patronum-common';
import { CreateFromQuery } from 'src/Dto/apiCall';

@UseGuards(JwtGuard)
@Controller('sponsored')
@ApiTags('Sponsored')
export class SponsoredController {
  constructor(
    private readonly sponsoredService: SponsoredService,
  ) {}
  @UseGuards(AdminGuard)
  @Post()
  @ApiOperation({
    summary: 'add new sponsored',
  })
  async create(@Body() dto: CreateSponsoredDto) {
    const sponsered =
      await this.sponsoredService.create(dto);
    return sponsered;
  }

  @Get()
  @ApiOperation({
    summary: 'Returns all Sponsered',
  })
  getSponsered(
    @Query() query,
    @GetUser() user: User,
  ) {
    const apiCall = CreateFromQuery(query);
    return this.sponsoredService.getSponsered(
      apiCall,
      user,
    );
  }
  @Get('me')
  @ApiOperation({
    summary: 'Returns all Sponsered by patron',
  })
  getByPatronMe(
    @GetUser() user: User,
    @Query() query,
  ) {
    const apiCall = CreateFromQuery(query);
    return this.sponsoredService.getSponseredByPatron(
      user.id,
      apiCall,
    );
  }

  @Get('patron/:id')
  @ApiOperation({
    summary: 'Returns all Sponsered by patron',
  })
  getByPatron(
    @Param('id') id: string,
    @Query() query,
  ) {
    const apiCall = CreateFromQuery(query);
    return this.sponsoredService.getSponseredByPatron(
      id,
      apiCall,
    );
  }

  @Get('not')
  getNonSponsered() {
    return this.sponsoredService.getNotSponsered();
  }
  @Get(':id')
  @ApiOperation({
    summary: 'Returns one Sponsored',
  })
  getOne(
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.sponsoredService.findOne(
      id,
      user,
    );
  }
  @Patch('adopt')
  sponserASponser(
    @GetUser() user: User,
    @Body()
    body: {
      id: string;
      user: User;
      startDate: string;
      endDate: string;
      sum: number;
    },
  ) {
    return this.sponsoredService.SponsorASponsered(
      body.id,
      user,
      new Date(body.startDate),
      new Date(body.endDate),
      body.sum,
    );
  }
  @ApiOperation({
    summary:
      'Returns all Sponsered without patron',
  })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateSponsoredDto: UpdateSponsoredDto,
  ) {
    return this.sponsoredService.update(
      id,
      updateSponsoredDto,
    );
  }
  @UseGuards(AdminGuard)
  @Patch('deactivate/:id')
  deactivate(@Param('id') id: string) {
    return this.sponsoredService.changeStatus(
      id,
      false,
    );
  }
  @UseGuards(AdminGuard)
  @Patch('activate/:id')
  activate(@Param('id') id: string) {
    return this.sponsoredService.changeStatus(
      id,
      true,
    );
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sponsoredService.remove(id);
  }
}
