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
import { User } from 'expecto-patronum-common';
import { ApiCallDto } from 'src/Dto/apiCall';

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
  getSponsered(@Body() apiCall: ApiCallDto<any>) {
    console.log('request came in');
    return this.sponsoredService.getSponsered(
      apiCall,
    );
  }
  @Get('me')
  @ApiOperation({
    summary: 'Returns all Sponsered by user',
  })
  getSponseredByPatron(
    @GetUser() user: User,
    @Body() apiCall: ApiCallDto<any>,
  ) {
    return this.sponsoredService.getSponseredByPatron(
      user,
      apiCall,
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
  @Patch('deactivate/:id')
  deactivate(@Param('id') id: string) {
    return this.sponsoredService.changeStatus(
      +id,
      false,
    );
  }
  @UseGuards(AdminGuard)
  @Patch('activate/:id')
  activate(@Param('id') id: string) {
    return this.sponsoredService.changeStatus(
      +id,
      true,
    );
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sponsoredService.remove(+id);
  }
}
