import { Test, TestingModule } from '@nestjs/testing';
import { UploadedFileController } from './uploaded-file.controller';
import { UploadedFileService } from './uploaded-file.service';

describe('UploadedFileController', () => {
  let controller: UploadedFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadedFileController],
      providers: [UploadedFileService],
    }).compile();

    controller = module.get<UploadedFileController>(UploadedFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
