import { Expose } from 'class-transformer';

class User {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}

class Review {
  @Expose()
  reviewId: number;

  @Expose()
  rating: number;

  @Expose()
  content: string;

  @Expose()
  user: User;
}

export class GetReviewsEntity {
  @Expose()
  reviews: Review[];
}
