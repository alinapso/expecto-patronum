import { Injectable } from '@nestjs/common';
import { CreateUploadedFileDto } from './dto/create-uploaded-file.dto';
import { UpdateUploadedFileDto } from './dto/update-uploaded-file.dto';

@Injectable()
export class UploadedFileService {
  create(createUploadedFileDto: CreateUploadedFileDto) {
    return 'This action adds a new uploadedFile';
  }

  findAll() {
    return `This action returns all uploadedFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadedFile`;
  }

  update(id: number, updateUploadedFileDto: UpdateUploadedFileDto) {
    return `This action updates a #${id} uploadedFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadedFile`;
  }
}
