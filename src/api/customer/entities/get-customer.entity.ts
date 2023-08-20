import { Expose } from 'class-transformer';

export class CustomerEntity {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  customerId: number;
}

export class GetCustomerEntity {
  @Expose()
  customers: CustomerEntity[];
}
