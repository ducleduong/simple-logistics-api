import { Expose } from 'class-transformer';

export class GetOrders {
  @Expose()
  orderId: number;

  @Expose()
  customerFirstName: string;

  @Expose()
  customerLastName: string;

  @Expose()
  shippingDate: Date;

  @Expose()
  status: string;
}

export class GetOrdersEntity {
  @Expose()
  total: number;

  @Expose()
  orders: GetOrders;

  @Expose()
  offset: number;

  @Expose()
  limit: number;
}
