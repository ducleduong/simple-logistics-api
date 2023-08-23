import { OrderStatus } from '@prisma/client';
import { Expose } from 'class-transformer';

class Customer {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}

class Address {
  @Expose()
  countryId: number;

  @Expose()
  stateId: number;

  @Expose()
  cityId: number;

  @Expose()
  address: string;

  @Expose()
  postalCode: string;
}

export class GetOrderDetailEntity {
  @Expose()
  orderId: number;

  @Expose()
  customer: Customer;

  @Expose()
  shippingAddress: Address;

  @Expose()
  recipientAddress: Address;

  @Expose()
  shippingDate: Date;

  @Expose()
  expectedDeliveryDate: Date;

  @Expose()
  status: OrderStatus;
}
