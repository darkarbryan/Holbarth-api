import { Injectable } from '@nestjs/common';
import { ProductPort } from '../../../domain/ports';

/**
 * Service for deleting a product (soft delete)
 */
@Injectable()
export class DeleteProductService {
    constructor(private readonly productPort: ProductPort) {}

    async execute(id: number): Promise<boolean> {
        const existingProduct = await this.productPort.findById(id);
        if (!existingProduct) {
            throw new Error('Producto no encontrado');
        }
        return await this.productPort.delete(id);
    }
}
