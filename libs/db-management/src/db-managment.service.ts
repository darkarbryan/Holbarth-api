/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import initializeDataSource from './data-source.connection';

@Injectable()
export class DBManagmentService {
  private dataSourceInstance: any;
  constructor() {
    this.getDataSource();
  }

  /**
   * Obtiene la conexion con la base de datos
   */
  async getDataSource(): Promise<any> {
    const dataSource = await initializeDataSource;
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    this.dataSourceInstance = dataSource;
    return dataSource;
  }

  async getNewTransaction(): Promise<any> {
    const dbTransaction = this.dataSource.createQueryRunner();
    await dbTransaction.connect();

    return dbTransaction;
  }

  /**
   * Retorna la instancia actual de base de datos
   *
   * @readonly
   * @type {*}
   */
  get dataSource() {
    return this.dataSourceInstance;
  }

  /**
   * Metodo que devuelve una instancia de queryRunner
   * en su propiedad manager para ejecutar mas rapida
   * las consultas sin procesar
   */
  async query(sql: string, params?: any): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    const result = await queryRunner.manager.query(sql, params);
    await queryRunner.release();
    return result;
  }
}
