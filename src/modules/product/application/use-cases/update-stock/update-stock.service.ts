import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductPort } from '../../../domain/ports';
import { IProduct } from '../../../domain/interfaces';

/**
 * Service for updating product stock
 */
@Injectable()
export class UpdateStockService {
  constructor(private readonly productPort: ProductPort) {}

  async execute(id: number, stock: number): Promise<IProduct | null> {
    const existingProduct = await this.productPort.findById(id);
    if (!existingProduct) {
      throw new NotFoundException('Producto no encontrado');
    }

    return await this.productPort.update(id, { stock });
  }
}
