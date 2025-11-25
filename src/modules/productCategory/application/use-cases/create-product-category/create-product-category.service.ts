import { Injectable } from '@nestjs/common';
import { ProductCategoryPort } from '../../../domain/ports';
import { IProductCategory, ICreateProductCategory } from '../../../domain/interfaces';

/**
 * Service for creating a new product category
 */
@Injectable()
export class CreateProductCategoryService {
    constructor(private readonly categoryPort: ProductCategoryPort) {}

    async execute(categoryData: ICreateProductCategory): Promise<IProductCategory> {
        const existingCategory = await this.categoryPort.findByName(categoryData.name);
        if (existingCategory) {
            throw new Error('Categoría ya existe');
        }
        return await this.categoryPort.create(categoryData);
    }
}
