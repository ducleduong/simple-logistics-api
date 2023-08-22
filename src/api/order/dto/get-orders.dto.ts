import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetOrdersDto {
  @IsInt()
  @IsOptional()
  orderId?: number;

  @IsString()
  @IsOptional()
  customerName?: string;

  @IsDate()
  @IsOptional()
  shippingDate?: Date;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(1000)
  limit?: number = 20;

  @IsInt()
  @IsOptional()
  @Min(0)
  offset?: number = 0;

  @IsString()
  @IsOptional()
  orderBy?: string;

  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false), {
    toClassOnly: true,
  })
  asc: boolean = true;
}
