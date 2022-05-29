import { User } from '../../user/entities/user.entity';
import { SponsoredEvents } from '../../sponsoredEvents/entities/sponsoredEvents.entity';

export class Sponsored {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  first_name: string;
  middle_name: string;
  father_name: string;
  last_name: string;
  birth_date: Date;
  place_of_birth: string;
  profile_pic: string | null;
  is_active: boolean;
  patron?: User | null;
  patron_id: number | null;
  monthly_sum: number | null;
  start_date: Date | null;
  end_date: Date | null;
  day_of_transaction: number | null;
  SponsoredEvents?: SponsoredEvents[];
}
