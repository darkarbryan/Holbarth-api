import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/core/entities';
import { ProductRepository } from './infraestructure';
import { ProductPort } from './domain/ports';
import { CreateProductService, FindProductService, UpdateProductService, DeleteProductService, UpdateStockService } from './application/use-cases';
import { ProductController } from './application/controllers';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    controllers: [ProductController],
    providers: [
        {
            provide: ProductPort,
            useClass: ProductRepository,
        },
        CreateProductService,
        FindProductService,
        UpdateProductService,
        DeleteProductService,
        UpdateStockService,
    ],
    exports: [ProductPort, FindProductService],
})
export class ProductModule {}
