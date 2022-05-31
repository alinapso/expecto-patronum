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
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
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
import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  editFileName,
  imageFileFilter,
} from 'src/uploaded-file/fileUpload.util';

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

  @ApiOperation({
    summary:
      'Returns all Sponsered without patron',
  })
  @Get('not')
  getNonSponsered() {
    return this.sponsoredService.getNotSponsered();
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
