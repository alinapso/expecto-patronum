import { User } from '../../user/entities/user.entity';

export class Transactions {
  id: number;
  sum: number;
  patron?: User;
  patronId: number;
  createdAt: Date;
  updatedAt: Date;
}
