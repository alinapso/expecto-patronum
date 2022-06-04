import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { UploadedFileService } from './uploaded-file.service';
import { CreateUploadedFileDto } from './dto/create-uploaded-file.dto';
import { UpdateUploadedFileDto } from './dto/update-uploaded-file.dto';
import { JwtGuard } from 'src/auth/guard';
import { ApiTags } from '@nestjs/swagger';
import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  editFileName,
  imageFileFilter,
} from './fileUpload.util';
import { createReadStream } from 'fs';
import { join } from 'path';

@UseGuards(JwtGuard)
@ApiTags('Uploaded File')
@Controller('uploaded-file')
export class UploadedFileController {
  constructor(
    private readonly uploadedFileService: UploadedFileService,
  ) {}

  @Get(':id')
  getFile(@Param('id') id: string): any {
    //console.log(`files/${id}`);
    try {
      const file = createReadStream(
        join(process.cwd(), `files/${id}`),
      );
      return new StreamableFile(file);
    } catch (e) {
      return new Response();
    }
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateUploadedFileDto: UpdateUploadedFileDto,
  ) {
    return this.uploadedFileService.update(
      id,
      updateUploadedFileDto,
    );
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(
    @UploadedFile() file,
    @Body() body,
  ) {
    const category = body.category
      ? body.category
      : 0;
    const split = file.filename.split('.');
    const payload = {
      id: split[0],
      name: file.originalname,
      type: split[1],
      //size: file.size,
      category: category,
    };
    console.log(payload);
    const response =
      await this.uploadedFileService.create(
        payload,
      );
    return response;
  }
  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(
    @UploadedFiles() files,
  ) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadedFileService.remove(id);
  }
}
