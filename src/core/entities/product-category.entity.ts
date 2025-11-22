import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from './product.entity';

@Entity({ name: 'productsCategory', schema: 'public' })
export class ProductCategoryEntity extends BaseEntity<ProductCategoryEntity> {
  @ApiProperty({
    description: 'Nombre de la categoria del producto',
    example: 'Lapiz',
    nullable: false,
    required: true,
  })
  @Column({
    type: 'varchar',
    unique: true,
    length: 50,
    comment: 'Nombre de la categoria del producto',
  })
  name: string;

  @ApiProperty({
    description: 'Descripción de la categoria del producto',
    example: 'Lapiz',
    nullable: false,
    required: false,
  })
  @Column({
    type: 'varchar',
    unique: false,
    nullable: true,
    length: 50,
    comment: 'Descripción de la categoria del producto',
  })
  description: string;

  @OneToMany(() => ProductEntity, (data) => data.productCategory)
  product: ProductEntity[];
}
