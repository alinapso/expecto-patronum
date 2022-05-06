import { PartialType } from '@nestjs/swagger';
import { CreateSponsoredEventDto } from './create-sponsored-event.dto';

export class UpdateSponsoredEventDto extends PartialType(CreateSponsoredEventDto) {}
