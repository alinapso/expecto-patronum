import { Role } from 'expecto-patronum-common';
import { Sponsored } from '../../sponsored/entities/sponsored.entity';
import { Transactions } from '../../transactions/entities/transactions.entity';

export class User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  hash: string;
  firstName: string | null;
  lastName: string | null;
  Address: string | null;
  role: Role | null;
  Sponsored?: Sponsored[];
  Transactions?: Transactions[];
}
