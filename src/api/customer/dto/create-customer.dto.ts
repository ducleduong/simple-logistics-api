import { IsInt, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  userId: string;
}
