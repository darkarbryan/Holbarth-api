import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IBaseModel {
  id?: number;
  createdBy?: number;
  createdAt?: Date;
  updatedBy?: number;
  updatedAt?: Date;
  deletedBy?: number;
  deletedAt?: Date;
  status?: boolean;
}

export class BaseEntity<T> implements IBaseModel {
  @PrimaryColumn('bigint', {
    unique: true,
    generated: true,
    primary: true,
    comment: 'id principal de la tabla',
  })
  id?: number;

  @Column('int', {
    nullable: true,
    select: true,
    name: 'create_by',
  })
  createdBy?: number;

  @CreateDateColumn({
    select: true,
    name: 'created_at',
  })
  createdAt?: Date;

  @Column('int', {
    nullable: true,
    select: false,
    name: 'update_by',
  })
  updatedBy?: number;

  @UpdateDateColumn({
    type: 'timestamp',
    select: false,
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'update_at',
    nullable: true,
  })
  updatedAt?: Date;

  @Column('int', {
    nullable: true,
    select: false,
    name: 'delete_by',
  })
  deletedBy?: number;

  @Column('timestamp', {
    nullable: true,
    select: false,
    name: 'delete_at',
  })
  deletedAt?: Date;

  @Column('boolean', { default: true })
  status?: boolean;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
