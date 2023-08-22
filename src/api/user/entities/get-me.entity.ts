import { Expose } from 'class-transformer';

export class GetMeEntity {
  @Expose()
  userId: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  username: string;
}
