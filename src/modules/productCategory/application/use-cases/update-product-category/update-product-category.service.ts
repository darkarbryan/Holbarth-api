import { Injectable } from '@nestjs/common';
import { ProductCategoryPort } from '../../../domain/ports';
import { IProductCategory, IUpdateProductCategory } from '../../../domain/interfaces';

/**
 * Service for updating a product category
 */
@Injectable()
export class UpdateProductCategoryService {
    constructor(private readonly categoryPort: ProductCategoryPort) {}

    async execute(id: number, categoryData: IUpdateProductCategory): Promise<IProductCategory | null> {
        const existingCategory = await this.categoryPort.findById(id);
        if (!existingCategory) {
            throw new Error('Categoría no encontrada');
        }

        if (categoryData.name && categoryData.name !== existingCategory.name) {
            const categoryWithSameName = await this.categoryPort.findByName(categoryData.name);
            if (categoryWithSameName && categoryWithSameName.id !== id) {
                throw new Error('El nombre de la categoría ya está en uso');
            }
        }

        return await this.categoryPort.update(id, categoryData);
    }
}
