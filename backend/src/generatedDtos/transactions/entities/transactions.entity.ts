import { User } from '../../user/entities/user.entity';

export class Transactions {
  id: number;
  sum: number;
  patron?: User;
  patron_id: number;
  createdAt: Date;
  updatedAt: Date;
}
