import { IsDate, IsInt } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  customerId: number;

  @IsInt()
  recipientAddressId: number;

  @IsInt()
  shippingAddressId: number;

  @IsDate()
  expectedDeliveryDate: Date;
}
