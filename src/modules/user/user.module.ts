import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/entities';
import { UserRepository } from './infraestructure';
import { UserPort } from './domain/ports';
import { CreateUserService, FindUserService, UpdateUserService, DeleteUserService } from './application/use-cases';
import { UserController } from './application/controllers';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [
        {
            provide: UserPort,
            useClass: UserRepository,
        },
        CreateUserService,
        FindUserService,
        UpdateUserService,
        DeleteUserService,
    ],
    exports: [UserPort],
})
export class UserModule {}
