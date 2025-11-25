import { Injectable } from '@nestjs/common';
import { ProductCategoryPort } from '../../../domain/ports';
import { IProductCategory } from '../../../domain/interfaces';

/**
 * Service for finding product categories
 */
@Injectable()
export class FindProductCategoryService {
    constructor(private readonly categoryPort: ProductCategoryPort) {}

    async findAll(): Promise<IProductCategory[]> {
        return await this.categoryPort.findAll();
    }

    async findById(id: number): Promise<IProductCategory | null> {
        return await this.categoryPort.findById(id);
    }

    async findByName(name: string): Promise<IProductCategory | null> {
        return await this.categoryPort.findByName(name);
    }
}
