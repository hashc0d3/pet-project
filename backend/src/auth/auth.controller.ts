import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')  // Путь для этого контроллера
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // Обработка POST-запроса на /api/auth/login
    @Post('login')  // Маршрут /api/auth/login
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.validateUser(body.email, body.password);
    }
}
