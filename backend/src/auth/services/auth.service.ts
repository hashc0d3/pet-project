import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(data: { email: string; password: string; name?: string }) {
    const user = await this.prisma.user.create({
      data: {
        ...data,
        role: 'USER',
      },
    });
    const { password, ...result } = user;
    return result;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateToken(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id,
      role: user.role 
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async checkPermissions(userId: number, requiredRole: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) return false;
    
    const roleHierarchy = {
      USER: 1,
      MODERATOR: 2,
      ADMIN: 3,
    };
    
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  }

  async findOrCreateGoogleUser(profile: {
    email: string;
    name: string;
    picture: string;
    accessToken: string;
  }) {
    let user = await this.prisma.user.findUnique({
      where: { email: profile.email },
    });

    if (!user) {
      // Создаем случайный пароль для пользователя
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await this.prisma.user.create({
        data: {
          email: profile.email,
          name: profile.name,
          password: hashedPassword,
          role: 'USER',
        },
      });
    }

    const { password, ...result } = user;
    return result;
  }
} 