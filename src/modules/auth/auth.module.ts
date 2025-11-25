import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/entities';
import { LoginRepository } from './infraestructure';
import { LoginPort } from './domain/ports';
import { LogInService } from './application/use-cases/log-in';
import { AuthController } from './application/controllers';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [AuthController],
    providers: [
        {
            provide: LoginPort,
            useClass: LoginRepository,
        },
        LogInService,
    ],
    exports: [LoginPort],
})
export class AuthModule {}
