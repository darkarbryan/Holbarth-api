import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateProductService, FindProductService, UpdateProductService, DeleteProductService } from '../use-cases';
import { CreateProductDto, UpdateProductDto } from '../dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(
        private readonly createProductService: CreateProductService,
        private readonly findProductService: FindProductService,
        private readonly updateProductService: UpdateProductService,
        private readonly deleteProductService: DeleteProductService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo producto' })
    @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.createProductService.execute(createProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los productos' })
    @ApiResponse({ status: 200, description: 'Lista de productos obtenida exitosamente' })
    async findAll() {
        return await this.findProductService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener producto por ID' })
    @ApiParam({ name: 'id', description: 'ID del producto' })
    @ApiResponse({ status: 200, description: 'Producto encontrado' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.findProductService.findById(id);
    }

    @Get('name/:name')
    @ApiOperation({ summary: 'Obtener producto por nombre' })
    @ApiParam({ name: 'name', description: 'Nombre del producto' })
    @ApiResponse({ status: 200, description: 'Producto encontrado' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    async findByName(@Param('name') name: string) {
        return await this.findProductService.findByName(name);
    }

    @Get('category/:categoryId')
    @ApiOperation({ summary: 'Obtener productos por categoría' })
    @ApiParam({ name: 'categoryId', description: 'ID de la categoría' })
    @ApiResponse({ status: 200, description: 'Productos encontrados' })
    async findByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
        return await this.findProductService.findByCategory(categoryId);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar producto' })
    @ApiParam({ name: 'id', description: 'ID del producto' })
    @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
        return await this.updateProductService.execute(id, updateProductDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar producto (soft delete)' })
    @ApiParam({ name: 'id', description: 'ID del producto' })
    @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.deleteProductService.execute(id);
    }
}
