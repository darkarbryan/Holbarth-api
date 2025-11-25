import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'productsCategory', schema: 'public' })
export class ProductCategoryEntity extends BaseEntity<ProductCategoryEntity> {
  @Column({
    type: 'varchar',
    unique: true,
    length: 50,
    comment: 'Nombre de la categoria del producto',
  })
  name: string;

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
