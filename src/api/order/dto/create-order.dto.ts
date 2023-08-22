import { IsInt, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  customerId: number;

  @IsInt()
  recipientAddressId: number;

  @IsInt()
  shippingAddressId: number;

  @IsString()
  expectedDeliveryDate: string;
}
