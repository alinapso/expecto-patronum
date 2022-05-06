import { UploadedFile } from '../../uploadedFile/entities/uploadedFile.entity';
import { Sponsored } from '../../sponsored/entities/sponsored.entity';

export class SponsoredEvents {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  event_date: Date;
  title: string;
  description: string;
  files?: UploadedFile[];
  sponsored?: Sponsored;
  sponsoredId: number;
}
