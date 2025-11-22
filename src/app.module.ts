import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBManagmentModule } from 'libs/db-management/src/db-managment.module';

@Module({
  imports: [DBManagmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
