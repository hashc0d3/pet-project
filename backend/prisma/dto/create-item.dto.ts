import { IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    image?: string;
}