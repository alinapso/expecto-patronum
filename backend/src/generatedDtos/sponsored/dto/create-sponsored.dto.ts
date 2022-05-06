export class CreateSponsoredDto {
  first_name: string;
  middle_name: string;
  FatherName: string;
  last_name: string;
  is_active: boolean;
  monthly_sum?: number;
  start_date?: Date;
  end_date?: Date;
  day_of_transaction?: number;
}
