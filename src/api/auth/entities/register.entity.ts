import { Expose } from 'class-transformer';

export class RegisterEntity {
  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}
