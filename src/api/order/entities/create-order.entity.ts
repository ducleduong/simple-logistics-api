import { Expose } from 'class-transformer';

export class CustomerEntity {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}

export class AddressEntity {
  @Expose()
  country: string;

  @Expose()
  city: string;

  @Expose()
  state: string;

  @Expose()
  address: string;

  @Expose()
  postalCode: string;
}

export class CreateOrderEntity {
  @Expose()
  OrderId: number;

  @Expose()
  customer: CustomerEntity;

  @Expose()
  shippingAddress: AddressEntity;

  @Expose()
  expectedDeliveryDate: Date;

  @Expose()
  recipientAddress: AddressEntity;

  @Expose()
  status: string;
}
