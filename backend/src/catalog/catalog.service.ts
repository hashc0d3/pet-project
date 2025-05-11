import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto } from '../prisma/dto/create-item.dto';

@Injectable()
export class CatalogService {
    constructor(private readonly prisma: PrismaService) {}

    async createItem(data: CreateItemDto) {
        try {
            return await this.prisma.product.create({ data });
        } catch (error) {
            throw new InternalServerErrorException(`Ошибка при создании продукта: ${error.message}`);
        }
    }

    async deleteItem(id: number): Promise<void> {
        try {
            await this.prisma.product.delete({
                where: { id },  // id передается как число
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException(`Продукт с ID ${id} не найден`);
            }
            throw new InternalServerErrorException(`Ошибка при удалении продукта: ${error.message}`);
        }
    }

    // Обновленный метод для получения всех продуктов с рейтингами
    async getAllProducts() {
        try {
            const products = await this.prisma.product.findMany({
                include: {
                    ratings: true,  // Подтягиваем все рейтинги для каждого продукта
                },
            });

            // Добавляем средний рейтинг и количество голосов
            return products.map(product => ({
                ...product,
                rating: {
                    average: product.ratings.length
                        ? product.ratings.reduce((acc, r) => acc + r.value, 0) / product.ratings.length
                        : 0,
                    count: product.ratings.length,
                },
            }));
        } catch (error) {
            throw new InternalServerErrorException(`Ошибка при получении продуктов: ${error.message}`);
        }
    }
}
