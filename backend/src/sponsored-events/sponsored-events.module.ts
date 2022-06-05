import { Module } from '@nestjs/common';
import { SponsoredEventsService } from './sponsored-events.service';
import { SponsoredEventsController } from './sponsored-events.controller';
import { UploadedFileService } from 'src/uploaded-file/uploaded-file.service';

@Module({
  controllers: [SponsoredEventsController],
  providers: [SponsoredEventsService],
  imports: [UploadedFileService],
})
export class SponsoredEventsModule {}
