import { User } from '../../user/entities/user.entity';
import { SponsoredEvents } from '../../sponsoredEvents/entities/sponsoredEvents.entity';

export class Sponsored {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  first_name: string;
  middle_name: string;
  FatherName: string;
  last_name: string;
  is_active: boolean;
  patron?: User | null;
  patronId: number | null;
  monthly_sum: number | null;
  start_date: Date | null;
  end_date: Date | null;
  day_of_transaction: number | null;
  SponsoredEvents?: SponsoredEvents[];
}
