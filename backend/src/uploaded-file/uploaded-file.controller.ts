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
import { UploadedFileService } from './uploaded-file.service';
import { CreateUploadedFileDto } from './dto/create-uploaded-file.dto';
import { UpdateUploadedFileDto } from './dto/update-uploaded-file.dto';
import { JwtGuard } from 'src/auth/guard';
import { ApiTags } from '@nestjs/swagger';
@UseGuards(JwtGuard)
@ApiTags('Uploaded File')
@Controller('uploaded-file')
export class UploadedFileController {
  constructor(
    private readonly uploadedFileService: UploadedFileService,
  ) {}

  @Post()
  create(
    @Body()
    createUploadedFileDto: CreateUploadedFileDto,
  ) {
    return this.uploadedFileService.create(
      createUploadedFileDto,
    );
  }

  @Get()
  findAll() {
    return this.uploadedFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadedFileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateUploadedFileDto: UpdateUploadedFileDto,
  ) {
    return this.uploadedFileService.update(
      +id,
      updateUploadedFileDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadedFileService.remove(+id);
  }
}
