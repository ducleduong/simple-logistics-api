import { Expose } from 'class-transformer';

export class CreateAddressEntity {
  @Expose()
  address: string;

  @Expose()
  country: string;

  @Expose()
  state: string;

  @Expose()
  city: string;

  @Expose()
  postalCode: string;
}
