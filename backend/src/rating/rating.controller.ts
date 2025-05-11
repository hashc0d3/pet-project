import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RatingService } from './rating.service';

@Controller('ratings')
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    @Post()
    async rateProduct(@Body() { userId, productId, value }: { userId: number; productId: number; value: number }) {
        return this.ratingService.rateProduct(userId, productId, value);
    }

    @Get(':productId')
    async getProductRating(@Param('productId') productId: string) {
        return this.ratingService.getProductRating(Number(productId));
    }
}
