import { IProduct, ICreateProduct, IUpdateProduct } from '../interfaces';

/**
 * Abstract class representing a ProductPort with methods for product CRUD operations.
 */
export abstract class ProductPort {
  abstract create(productData: ICreateProduct): Promise<IProduct>;
  abstract findAll(): Promise<IProduct[]>;
  abstract findById(id: number): Promise<IProduct | null>;
  abstract findByName(name: string): Promise<IProduct | null>;
  abstract update(
    id: number,
    productData: IUpdateProduct,
  ): Promise<IProduct | null>;
  abstract delete(id: number): Promise<boolean>;
  abstract findByCategory(categoryId: number): Promise<IProduct[]>;
}
