import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RatingService {
    constructor(private prisma: PrismaService) {}

    async rateProduct(userId: number, productId: number, value: number) {
        if (value < 1 || value > 5) {
            throw new Error('Оценка должна быть от 1 до 5');
        }

        return this.prisma.rating.upsert({
            where: {
                userId_productId: { userId, productId },  // Так как у нас есть уникальный составной индекс
            },
            update: { value },
            create: { userId, productId, value },
        });
    }

    async getProductRating(productId: number) {
        const ratings = await this.prisma.rating.aggregate({
            where: { productId },
            _avg: { value: true },
            _count: { value: true },
        });

        return {
            average: ratings._avg.value || 0,
            count: ratings._count.value || 0,
        };
    }
}
