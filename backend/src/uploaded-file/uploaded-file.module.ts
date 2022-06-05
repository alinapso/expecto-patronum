import { Module } from '@nestjs/common';
import { UploadedFileService } from './uploaded-file.service';
import { UploadedFileController } from './uploaded-file.controller';

@Module({
  controllers: [UploadedFileController],
  providers: [UploadedFileService],
  exports: [UploadedFileService],
})
export class UploadedFileModule {}
