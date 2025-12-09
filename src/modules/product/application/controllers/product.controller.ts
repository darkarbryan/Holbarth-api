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
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { OwnershipGuard } from 'src/modules/auth/ownership.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';
import { GetUser } from 'src/modules/auth/get-user.decorator';
import { UserEntity } from 'src/core/entities/user.entity';
import { EUserRole } from 'src/core/enums/role.enum';
import {
  CreateProductService,
  FindProductService,
  UpdateProductService,
  DeleteProductService,
  UpdateStockService,
} from '../use-cases';
import { CreateProductDto, UpdateProductDto, UpdateStockDto } from '../dto';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly findProductService: FindProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
    private readonly updateStockService: UpdateStockService,
  ) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: UserEntity,
  ) {
    return await this.createProductService.execute({
      ...createProductDto,
      creatorId: user.id!,
    });
  }

  @Get('low-stock')
  @UseGuards(RolesGuard)
  @Roles(EUserRole.ADMIN)
  async getLowStock(
    @Query('threshold', new DefaultValuePipe(10), ParseIntPipe)
    threshold: number,
  ) {
    return await this.findProductService.findLowStock(threshold);
  }

  @Get('my-products')
  async getMyProducts(@GetUser() user: UserEntity) {
    return await this.findProductService.findByCreator(user.id!);
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

  @Put(':id/stock')
  @UseGuards(OwnershipGuard)
  async updateStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return await this.updateStockService.execute(id, updateStockDto.stock);
  }

  @Put(':id')
  @UseGuards(OwnershipGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.updateProductService.execute(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(OwnershipGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteProductService.execute(id);
  }
}
