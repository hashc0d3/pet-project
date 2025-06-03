import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, pass: string) {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Неверные учетные данные');
    }

    async generateToken(userData: any) {
        return this.jwtService.sign({ sub: userData.id, role: userData.role });
    }

    async validateToken(token: string) {
        return this.jwtService.verify(token);
    }

    checkPermissions(user: any, action: string): boolean {
        // Пример: user.role = 'admin' разрешено всё
        if (user.role === 'admin') return true;
        // Дополнительная проверка
        return false;
    }
}
