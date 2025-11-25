import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/core/entities';
import { ProductRepository } from './infraestructure';
import { ProductPort } from './domain/ports';
import { CreateProductService, FindProductService, UpdateProductService, DeleteProductService } from './application/use-cases';
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
    ],
    exports: [ProductPort],
})
export class ProductModule {}
