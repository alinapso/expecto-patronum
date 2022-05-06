import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { SponsoredEventsService } from './sponsored-events.service';

describe('SponsoredEventsService', () => {
  let service: SponsoredEventsService;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [SponsoredEventsService],
      }).compile();

    service = module.get<SponsoredEventsService>(
      SponsoredEventsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
