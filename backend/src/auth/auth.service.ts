import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    // Метод для проверки пароля при логине
    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error('Неверный email или пароль');
        }

        // Проверяем пароль в открытом виде
        if (user.password !== password) {
            throw new Error('Неверный email или пароль');
        }

        return user;
    }
}
