import { Test, TestingModule } from '@nestjs/testing';
import { SponsoredEventsController } from './sponsored-events.controller';
import { SponsoredEventsService } from './sponsored-events.service';

describe('SponsoredEventsController', () => {
  let controller: SponsoredEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SponsoredEventsController],
      providers: [SponsoredEventsService],
    }).compile();

    controller = module.get<SponsoredEventsController>(SponsoredEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
