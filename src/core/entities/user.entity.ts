import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'users', schema: 'public' })
export class UserEntity extends BaseEntity<UserEntity> {
  @Column({
    type: 'varchar',
    unique: true,
    length: 50,
    comment: 'Nombre del ususario',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 250,
    comment: 'Contraseña del ususario',
  })
  password: string;

  @Column({
    name: 'user_status_code',
    type: 'varchar',
    nullable: false,
    default: 'INACTIVE',
    comment: 'Código del estado del usuario',
  })
  userStatusCode: string;

  @Column({
    name: 'role',
    type: 'varchar',
    nullable: false,
    default: 'DEFAULT',
    comment: 'Rol del usuario',
  })
  role: string;

  @OneToMany(() => ProductEntity, (product) => product.creator)
  products: ProductEntity[];
}
