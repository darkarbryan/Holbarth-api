import { Global, Module } from '@nestjs/common';
import { getTypeOrmModuleOptionsDbManager } from './db-config.connection';
import { DBManagmentService } from './db-managment.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  providers: [DBManagmentService],
  imports: [getTypeOrmModuleOptionsDbManager(), TypeOrmModule.forFeature([])],
  exports: [getTypeOrmModuleOptionsDbManager(), DBManagmentService],
})
export class DBManagmentModule {}
