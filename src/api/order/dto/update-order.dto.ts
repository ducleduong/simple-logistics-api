import { IsInt } from 'class-validator';

export class UpdateOrderDto {
  @IsInt()
  shippingAddressId: number;
}
