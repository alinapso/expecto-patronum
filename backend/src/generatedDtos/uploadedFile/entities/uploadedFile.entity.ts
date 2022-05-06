import { SponsoredEvents } from '../../sponsoredEvents/entities/sponsoredEvents.entity';

export class UploadedFile {
  id: number;
  name: string;
  type: string;
  SponsoredEvents?: SponsoredEvents | null;
  sponsoredEventsId: number | null;
}
