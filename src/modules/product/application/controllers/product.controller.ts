import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import {
  CreateProductService,
  FindProductService,
  UpdateProductService,
  DeleteProductService,
} from '../use-cases';
import { CreateProductDto, UpdateProductDto } from '../dto';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly findProductService: FindProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.createProductService.execute(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.findProductService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.findProductService.findById(id);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    return await this.findProductService.findByName(name);
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.findProductService.findByCategory(categoryId);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.updateProductService.execute(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteProductService.execute(id);
  }
}
