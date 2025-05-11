import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../prisma/dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(data: CreateUserDto) {
        try {
            return await this.prisma.user.create({
                data,
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    async getUserById(id: number) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: Number(id) }, // Убедитесь, что id преобразован в число
            });
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            return user;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}