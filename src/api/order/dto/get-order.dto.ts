import { IsInt } from 'class-validator';

export class GetOrderParamDto {
  @IsInt()
  orderId: number;
}
