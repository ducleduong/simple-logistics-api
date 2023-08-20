import { Expose } from 'class-transformer';

export class CreateCustomerEntity {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  customerId: string;

  @Expose()
  userId: string;
}
