import { FileCategory } from '@prisma/client';

export class CreateUploadedFileDto {
  id: string;
  name: string;
  type: string;
  category: FileCategory;
  sponsoredEventsId?: string | null;
}
