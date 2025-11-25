import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/core/entities';
import { LoginPort } from '../domain/ports';
import { IUser } from 'src/modules/user/domain/interfaces';

@Injectable()
export class LoginRepository extends LoginPort {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {
        super();
    }

    async verifyCredentials(username: string, password: string): Promise<IUser | null> {
        const user = await this.userRepository.findOne({
            where: { 
                username, 
                password,
                status: true 
            }
        });
        
        return user || null;
    }
}
