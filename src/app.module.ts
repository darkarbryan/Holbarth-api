import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBManagmentModule } from 'libs/db-management/src/db-managment.module';
import { UserModule } from './modules/user';
import { ProductModule } from './modules/product';
import { ProductCategoryModule } from './modules/productCategory';
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    DBManagmentModule,
    UserModule,
    ProductModule,
    ProductCategoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
