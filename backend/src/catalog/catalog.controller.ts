import { Controller, Delete, Get, Post, Param, Body, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateItemDto } from '../prisma/dto/create-item.dto';

@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    @Get()
    async getCatalog() {
        return this.catalogService.getAllProducts();
    }

    @Post()
    async create(@Body() createItemDto: CreateItemDto) {
        return this.catalogService.createItem(createItemDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.catalogService.deleteItem(id);
    }
}
