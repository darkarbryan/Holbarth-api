import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/core/entities';
import { ProductPort } from '../domain/ports';
import { IProduct, ICreateProduct, IUpdateProduct } from '../domain/interfaces';

@Injectable()
export class ProductRepository extends ProductPort {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {
    super();
  }

  async create(productData: ICreateProduct): Promise<IProduct> {
    const productEntity = this.productRepository.create({
      ...productData,
      productCategoryId: productData.productCategoryId,
    });
    return await this.productRepository.save(productEntity);
  }

  async findAll(): Promise<IProduct[]> {
    return await this.productRepository.find({
      where: { status: true },
      relations: ['productCategory', 'creator'],
    });
  }

  async findById(id: number): Promise<IProduct | null> {
    return await this.productRepository.findOne({
      where: { id, status: true },
      relations: ['productCategory', 'creator'],
    });
  }

  async findByName(name: string): Promise<IProduct | null> {
    return await this.productRepository.findOne({
      where: { name, status: true },
      relations: ['productCategory', 'creator'],
    });
  }

  async update(
    id: number,
    productData: IUpdateProduct,
  ): Promise<IProduct | null> {
    const updateData = {
      ...productData,
      productCategoryId: productData.productCategoryId,
    };
    await this.productRepository.update(id, updateData);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.productRepository.update(id, {
      status: false,
      deletedAt: new Date(),
    });
    return (result.affected ?? 0) > 0;
  }

  async findByCategory(categoryId: number): Promise<IProduct[]> {
    return await this.productRepository.find({
      where: {
        productCategory: { id: categoryId },
        status: true,
      },
      relations: ['productCategory', 'creator'],
    });
  }

  async findLowStock(threshold: number): Promise<IProduct[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productCategory', 'productCategory')
      .leftJoinAndSelect('product.creator', 'creator')
      .where('product.status = :status', { status: true })
      .andWhere('product.stock < :threshold', { threshold })
      .getMany();
  }

  async findByCreator(creatorId: number): Promise<IProduct[]> {
    return await this.productRepository.find({
      where: {
        creatorId,
        status: true,
      },
      relations: ['productCategory', 'creator'],
    });
  }
}
