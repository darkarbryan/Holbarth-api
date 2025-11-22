/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as entities from '../../../src/core/entities/index';

export const getTypeOrmModuleOptionsDbManager = () => {
  return TypeOrmModule.forRootAsync({
    name: 'default',
    imports: [],
    inject: [],
    useFactory: (): TypeOrmModuleOptions => ({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: false,
      ssl: false,
      migrations: [],
      cache: {
        duration: 60000, // 1 minute
      },
      entities: Object.values(entities).filter(
        (entity: any) =>
          typeof entity === 'function' && /^[A-Z]/.test(entity.name),
      ),
    }),
  });
};
