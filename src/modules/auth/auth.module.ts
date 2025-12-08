/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/entities';
import { LoginRepository } from './infraestructure';
import { LoginPort } from './domain/ports';
import { LogInService } from './application/use-cases/log-in';
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
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: LoginPort,
      useClass: LoginRepository,
    },
    LogInService,
    JwtStrategy,
  ],
  exports: [LoginPort, PassportModule, JwtModule],
})
export class AuthModule {}
