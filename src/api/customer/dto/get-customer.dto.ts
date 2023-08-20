import { IsOptional, IsString } from 'class-validator';

export class GetCustomerDto {
  @IsString()
  @IsOptional()
  customerName?: string;
}
