import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateProductCategoryService, FindProductCategoryService, UpdateProductCategoryService, DeleteProductCategoryService } from '../use-cases';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from '../dto';

@Controller('product-categories')
export class ProductCategoryController {
    constructor(
        private readonly createCategoryService: CreateProductCategoryService,
        private readonly findCategoryService: FindProductCategoryService,
        private readonly updateCategoryService: UpdateProductCategoryService,
        private readonly deleteCategoryService: DeleteProductCategoryService,
    ) {}

    @Post()
    async create(@Body() createCategoryDto: CreateProductCategoryDto) {
        return await this.createCategoryService.execute(createCategoryDto);
    }

    @Get()
    async findAll() {
        return await this.findCategoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.findCategoryService.findById(id);
    }

    @Get('name/:name')
    async findByName(@Param('name') name: string) {
        return await this.findCategoryService.findByName(name);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateProductCategoryDto) {
        return await this.updateCategoryService.execute(id, updateCategoryDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.deleteCategoryService.execute(id);
    }
}
