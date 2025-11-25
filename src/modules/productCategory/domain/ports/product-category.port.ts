import { IProductCategory, ICreateProductCategory, IUpdateProductCategory } from '../interfaces';

/**
 * Abstract class representing a ProductCategoryPort with methods for product category CRUD operations.
 */
export abstract class ProductCategoryPort {
    abstract create(categoryData: ICreateProductCategory): Promise<IProductCategory>;
    abstract findAll(): Promise<IProductCategory[]>;
    abstract findById(id: number): Promise<IProductCategory | null>;
    abstract findByName(name: string): Promise<IProductCategory | null>;
    abstract update(id: number, categoryData: IUpdateProductCategory): Promise<IProductCategory | null>;
    abstract delete(id: number): Promise<boolean>;
}
