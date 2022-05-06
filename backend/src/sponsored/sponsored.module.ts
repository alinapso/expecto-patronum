import { Module } from '@nestjs/common';
import { SponsoredService } from './sponsored.service';
import { SponsoredController } from './sponsored.controller';

@Module({
  controllers: [SponsoredController],
  providers: [SponsoredService]
})
export class SponsoredModule {}
