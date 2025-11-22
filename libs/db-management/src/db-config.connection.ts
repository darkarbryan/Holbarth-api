import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

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
      synchronize: false,
      logging: false,
      ssl: false,
      migrations: [],
      cache: {
        duration: 60000, // 1 minute
      },
    }),
  });
};
