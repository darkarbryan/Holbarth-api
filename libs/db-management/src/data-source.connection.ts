/* eslint-disable @typescript-eslint/require-await */
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

const initializeDataSource = async () => {
  const dataSourceDbManager: DataSourceOptions = {
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
  };

  const dataSource = new DataSource(dataSourceDbManager);
  return dataSource;
};

// Exportamos la promesa del `DataSource`
export default initializeDataSource();
