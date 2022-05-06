import { Test, TestingModule } from '@nestjs/testing';
import { SponsoredController } from './sponsored.controller';
import { SponsoredService } from './sponsored.service';

describe('SponsoredController', () => {
  let controller: SponsoredController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SponsoredController],
      providers: [SponsoredService],
    }).compile();

    controller = module.get<SponsoredController>(SponsoredController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
