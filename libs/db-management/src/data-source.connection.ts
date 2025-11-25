/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import { DataSource, DataSourceOptions } from 'typeorm';
import * as entities from '../../../src/core/entities/index';

const initializeDataSource = async () => {
  const dataSourceDbManager: DataSourceOptions = {
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
    entities: Object.values(entities).filter(
      (entity: any) =>
        typeof entity === 'function' && /^[A-Z]/.test(entity.name),
    ),
  };

  const dataSource = new DataSource(dataSourceDbManager);
  return dataSource;
};

// Exportamos la promesa del `DataSource`
export default initializeDataSource();
