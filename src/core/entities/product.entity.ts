import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { ProductCategoryEntity } from './product-category.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'products', schema: 'public' })
export class ProductEntity extends BaseEntity<ProductEntity> {
  @Column({
    type: 'varchar',
    unique: true,
    length: 50,
    comment: 'Nombre del producto',
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: false,
    length: 50,
    comment: 'Descripción del producto',
  })
  description: string;

  @Column({
    type: 'decimal',
    comment: 'Precio del producto',
  })
  price: number;

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

  @ManyToOne(() => UserEntity, (user) => user.products)
  creator: UserEntity;

  @Column({
    name: 'creator_id',
    type: 'bigint',
    nullable: false,
  })
  creatorId: number;
}
