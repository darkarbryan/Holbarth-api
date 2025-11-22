import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';

@Entity({ name: 'users', schema: 'public' })
export class UserEntity extends BaseEntity<UserEntity> {
  @ApiProperty({
    description: 'Nombre del ususario',
    example: 'Lorena Campos',
    nullable: false,
    required: false,
  })
  @Column({
    type: 'varchar',
    unique: true,
    length: 50,
    comment: 'Nombre del ususario',
  })
  username: string;

  @ApiProperty({
    description: 'Contraseña del ususario',
    example: 'as1d98a9s1a9s*7asd7*asd*da6s51w1d12',
    nullable: false,
    required: true,
  })
  @Column({
    type: 'varchar',
    length: 250,
    comment: 'Contraseña del ususario',
  })
  password: string;

  @ApiProperty({
    description: 'Estado del usuario',
    example: 'ACTIVO',
    nullable: true,
    required: false,
  })
  @Column({
    name: 'user_status_code',
    type: 'varchar',
    nullable: false,
    default: 'INACTIVE',
    comment: 'Código del estado del usuario',
  })
  userStatusCode: string;
  @ApiHideProperty()
  userStatus: string;
}
