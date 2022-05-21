import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { SponsoredService } from './sponsored.service';

describe('SponsoredService', () => {
  let service: SponsoredService;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [SponsoredService],
      }).compile();

    service = module.get<SponsoredService>(
      SponsoredService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
