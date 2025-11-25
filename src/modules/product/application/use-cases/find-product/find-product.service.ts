import { Injectable } from '@nestjs/common';
import { ProductPort } from '../../../domain/ports';
import { IProduct } from '../../../domain/interfaces';

/**
 * Service for finding products
 */
@Injectable()
export class FindProductService {
    constructor(private readonly productPort: ProductPort) {}

    async findAll(): Promise<IProduct[]> {
        return await this.productPort.findAll();
    }

    async findById(id: number): Promise<IProduct | null> {
        return await this.productPort.findById(id);
    }

    async findByName(name: string): Promise<IProduct | null> {
        return await this.productPort.findByName(name);
    }

    async findByCategory(categoryId: number): Promise<IProduct[]> {
        return await this.productPort.findByCategory(categoryId);
    }
}
