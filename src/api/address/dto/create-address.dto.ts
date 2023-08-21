import { IsInt, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  address: string;

  @IsInt()
  countryId: number;

  @IsInt()
  stateId: number;

  @IsInt()
  cityId: number;

  @IsString()
  postalCode: string;

  @IsInt()
  customerId: number;
}
