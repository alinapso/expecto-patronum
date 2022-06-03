export class CreateUploadedFileDto {
  id: string;
  name: string;
  type: string;
  category: number;
  sponsoredEventsId?: string | null;
}
