import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetReviewsEntity } from './entities/get-reviews.entity';
import { RequestHeader } from 'src/decorators/request-header.decorator';
import { CommonHeader } from 'src/common/header/header.dto';
import { AuthGuard } from '@nestjs/passport';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateReviewEntity } from './entities/create-review.entity';

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getReviews(
    @RequestHeader(CommonHeader) header: CommonHeader,
  ): Promise<GetReviewsEntity> {
    return await this.reviewService.getReviews(header);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createReview(
    @RequestHeader(CommonHeader) header: CommonHeader,
    @Body() body: CreateReviewDto,
  ): Promise<CreateReviewEntity> {
    return await this.reviewService.createReview(header, body);
  }
}
