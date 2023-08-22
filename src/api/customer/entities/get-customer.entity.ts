import { Expose } from 'class-transformer';
class Address {
  @Expose()
  country: string;

  @Expose()
  state: string;

  @Expose()
  city: string;

  @Expose()
  postalCode: string;

  @Expose()
  address: string;
}

export class CustomerEntity {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  customerId: number;

  @Expose()
  addresses: Address[];
}

export class GetCustomerEntity {
  @Expose()
  customers: CustomerEntity[];
}
