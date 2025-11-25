import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategoryEntity } from 'src/core/entities';
import { ProductCategoryPort } from '../domain/ports';
import { IProductCategory, ICreateProductCategory, IUpdateProductCategory } from '../domain/interfaces';

@Injectable()
export class ProductCategoryRepository extends ProductCategoryPort {
    constructor(
        @InjectRepository(ProductCategoryEntity)
        private readonly categoryRepository: Repository<ProductCategoryEntity>,
    ) {
        super();
    }

    async create(categoryData: ICreateProductCategory): Promise<IProductCategory> {
        const category = this.categoryRepository.create(categoryData);
        return await this.categoryRepository.save(category);
    }

    async findAll(): Promise<IProductCategory[]> {
        return await this.categoryRepository.find({
            where: { status: true },
            relations: ['product']
        });
    }

    async findById(id: number): Promise<IProductCategory | null> {
        return await this.categoryRepository.findOne({
            where: { id, status: true },
            relations: ['product']
        });
    }

    async findByName(name: string): Promise<IProductCategory | null> {
        return await this.categoryRepository.findOne({
            where: { name, status: true },
            relations: ['product']
        });
    }

    async update(id: number, categoryData: IUpdateProductCategory): Promise<IProductCategory | null> {
        await this.categoryRepository.update(id, categoryData);
        return await this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.categoryRepository.update(id, { 
            status: false,
            deletedAt: new Date()
        });
        return result.affected > 0;
    }
}
