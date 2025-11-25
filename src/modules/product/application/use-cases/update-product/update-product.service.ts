import { Injectable } from '@nestjs/common';
import { ProductPort } from '../../../domain/ports';
import { IProduct, IUpdateProduct } from '../../../domain/interfaces';

/**
 * Service for updating a product
 */
@Injectable()
export class UpdateProductService {
    constructor(private readonly productPort: ProductPort) {}

    async execute(id: number, productData: IUpdateProduct): Promise<IProduct | null> {
        const existingProduct = await this.productPort.findById(id);
        if (!existingProduct) {
            throw new Error('Producto no encontrado');
        }

        if (productData.name && productData.name !== existingProduct.name) {
            const productWithSameName = await this.productPort.findByName(productData.name);
            if (productWithSameName && productWithSameName.id !== id) {
                throw new Error('El nombre del producto ya está en uso');
            }
        }

        return await this.productPort.update(id, productData);
    }
}
