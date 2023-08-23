import { IsString } from 'class-validator';

export class CheckCustomerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
