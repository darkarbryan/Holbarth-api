import { Injectable } from '@nestjs/common';
import { ProductPort } from '../../../domain/ports';
import { IProduct, ICreateProduct } from '../../../domain/interfaces';

/**
 * Service for creating a new product
 */
@Injectable()
export class CreateProductService {
    constructor(private readonly productPort: ProductPort) {}

    async execute(productData: ICreateProduct): Promise<IProduct> {
        const existingProduct = await this.productPort.findByName(productData.name);
        if (existingProduct) {
            throw new Error('Producto ya existe');
        }
        return await this.productPort.create(productData);
    }
}
