import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProductCategoryEntity } from './product-category.entity';

@Entity({ name: 'products', schema: 'public' })
export class ProductEntity extends BaseEntity<ProductEntity> {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Lapiz',
    nullable: false,
    required: true,
  })
  @Column({
    type: 'varchar',
    unique: true,
    length: 50,
    comment: 'Nombre del producto',
  })
  name: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Lapiz',
    nullable: false,
    required: false,
  })
  @Column({
    type: 'varchar',
    unique: false,
    length: 50,
    comment: 'Descripción del producto',
  })
  description: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1200,
    nullable: false,
    required: true,
  })
  @Column({
    type: 'decimal',
    comment: 'Precio del producto',
  })
  price: number;

  @ApiProperty({
    description: 'Cantidad disponible del producto',
    example: 1200,
    nullable: false,
    required: true,
  })
  @Column({
    type: 'decimal',
    comment: 'Cantidad disponible del producto',
  })
  stock: number;

  @ManyToOne(() => ProductCategoryEntity, (data) => data.product)
  productCategory: ProductCategoryEntity;

  @Column({
    name: 'product_category_id',
    type: 'bigint',
    nullable: true,
  })
  productCategoryId?: number;
}
