import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
