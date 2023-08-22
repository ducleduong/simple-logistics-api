import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CommonHeader } from '../../common/header/header.dto';
import { GetReviewsEntity } from './entities/get-reviews.entity';
import { plainToInstance } from 'class-transformer';
import { CreateReviewEntity } from './entities/create-review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(private prismaService: PrismaService) {}

  async getReviews(header: CommonHeader): Promise<GetReviewsEntity> {
    const reviews = await this.prismaService.review.findMany({
      where: {
        userId: parseInt(header.userId),
      },
      select: {
        reviewId: true,
        content: true,
        user: true,
        rating: true,
      },
    });

    return plainToInstance(GetReviewsEntity, {
      reviews: reviews.map(review => ({
        reviewId: review.reviewId,
        content: review.content,
        rating: review.rating,
        user: {
          firstName: review.user.firstName,
          lastName: review.user.lastName,
        },
      })),
    });
  }

  async createReview(
    header: CommonHeader,
    body: CreateReviewDto,
  ): Promise<CreateReviewEntity> {
    const review = await this.prismaService.review.create({
      data: {
        userId: parseInt(header.userId),
        content: body.content,
        rating: body.rating,
      },
    });

    return plainToInstance(CreateReviewEntity, review);
  }
}
