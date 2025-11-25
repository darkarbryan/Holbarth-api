import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryEntity } from 'src/core/entities';
import { ProductCategoryRepository } from './infraestructure';
import { ProductCategoryPort } from './domain/ports';
import { CreateProductCategoryService, FindProductCategoryService, UpdateProductCategoryService, DeleteProductCategoryService } from './application/use-cases';
import { ProductCategoryController } from './application/controllers';

@Module({
    imports: [TypeOrmModule.forFeature([ProductCategoryEntity])],
    controllers: [ProductCategoryController],
    providers: [
        {
            provide: ProductCategoryPort,
            useClass: ProductCategoryRepository,
        },
        CreateProductCategoryService,
        FindProductCategoryService,
        UpdateProductCategoryService,
        DeleteProductCategoryService,
    ],
    exports: [ProductCategoryPort],
})
export class ProductCategoryModule {}
