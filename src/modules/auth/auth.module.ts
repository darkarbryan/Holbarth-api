/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/product.module';
import { UserEntity } from 'src/core/entities';
import { LoginRepository, UserRepository } from './infraestructure';
import { LoginPort, UserPort } from './domain/ports';
import { LogInService } from './application/use-cases/log-in';
import { FindUserService, UpdateUserService } from './application/use-cases';
import { AuthController } from './application/controllers';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET_KEY ?? 'Holbarth2025*'}`,
      signOptions: { expiresIn: '60m' },
    }),
    ProductModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: LoginPort,
      useClass: LoginRepository,
    },
    {
      provide: UserPort,
      useClass: UserRepository,
    },
    LogInService,
    FindUserService,
    UpdateUserService,
    JwtStrategy,
  ],
  exports: [LoginPort, UserPort, PassportModule, JwtModule],
})
export class AuthModule {}
