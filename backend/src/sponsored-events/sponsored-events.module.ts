import { Module } from '@nestjs/common';
import { SponsoredEventsService } from './sponsored-events.service';
import { SponsoredEventsController } from './sponsored-events.controller';

@Module({
  controllers: [SponsoredEventsController],
  providers: [SponsoredEventsService],
})
export class SponsoredEventsModule {}
