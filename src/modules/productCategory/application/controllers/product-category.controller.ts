import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateProductCategoryService, FindProductCategoryService, UpdateProductCategoryService, DeleteProductCategoryService } from '../use-cases';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from '../dto';

@ApiTags('product-categories')
@Controller('product-categories')
export class ProductCategoryController {
    constructor(
        private readonly createCategoryService: CreateProductCategoryService,
        private readonly findCategoryService: FindProductCategoryService,
        private readonly updateCategoryService: UpdateProductCategoryService,
        private readonly deleteCategoryService: DeleteProductCategoryService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear una nueva categoría de producto' })
    @ApiResponse({ status: 201, description: 'Categoría creada exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    async create(@Body() createCategoryDto: CreateProductCategoryDto) {
        return await this.createCategoryService.execute(createCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las categorías de producto' })
    @ApiResponse({ status: 200, description: 'Lista de categorías obtenida exitosamente' })
    async findAll() {
        return await this.findCategoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener categoría por ID' })
    @ApiParam({ name: 'id', description: 'ID de la categoría' })
    @ApiResponse({ status: 200, description: 'Categoría encontrada' })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.findCategoryService.findById(id);
    }

    @Get('name/:name')
    @ApiOperation({ summary: 'Obtener categoría por nombre' })
    @ApiParam({ name: 'name', description: 'Nombre de la categoría' })
    @ApiResponse({ status: 200, description: 'Categoría encontrada' })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
    async findByName(@Param('name') name: string) {
        return await this.findCategoryService.findByName(name);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar categoría' })
    @ApiParam({ name: 'id', description: 'ID de la categoría' })
    @ApiResponse({ status: 200, description: 'Categoría actualizada exitosamente' })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateProductCategoryDto) {
        return await this.updateCategoryService.execute(id, updateCategoryDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar categoría (soft delete)' })
    @ApiParam({ name: 'id', description: 'ID de la categoría' })
    @ApiResponse({ status: 200, description: 'Categoría eliminada exitosamente' })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.deleteCategoryService.execute(id);
    }
}
