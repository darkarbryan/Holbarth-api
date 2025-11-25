import { Injectable } from '@nestjs/common';
import { ProductCategoryPort } from '../../../domain/ports';

/**
 * Service for deleting a product category (soft delete)
 */
@Injectable()
export class DeleteProductCategoryService {
    constructor(private readonly categoryPort: ProductCategoryPort) {}

    async execute(id: number): Promise<boolean> {
        const existingCategory = await this.categoryPort.findById(id);
        if (!existingCategory) {
            throw new Error('Categoría no encontrada');
        }
        return await this.categoryPort.delete(id);
    }
}
