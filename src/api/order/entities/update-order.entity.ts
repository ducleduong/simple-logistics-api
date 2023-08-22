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
  country: string;

  @Expose()
  state: string;

  @Expose()
  city: string;

  @Expose()
  address: string;

  @Expose()
  postalCode: string;
}

export class UpdateOrderEntity {
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
