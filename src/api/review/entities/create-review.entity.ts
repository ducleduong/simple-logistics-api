import { Expose } from 'class-transformer';

export class CreateReviewEntity {
  @Expose()
  userId: number;

  @Expose()
  content: string;

  @Expose()
  rating: number;
}
