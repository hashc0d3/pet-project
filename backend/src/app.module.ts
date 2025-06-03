import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <-- добавить
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // <-- добавить
    AuthModule,
    UsersModule,
    PrismaModule,
  ],
})
export class AppModule {}