import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteItemDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}