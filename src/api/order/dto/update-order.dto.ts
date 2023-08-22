import { OrderStatus } from '@prisma/client';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsInt()
  @IsOptional()
  shippingAddressId?: number;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
