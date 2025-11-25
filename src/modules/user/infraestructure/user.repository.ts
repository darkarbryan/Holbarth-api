import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/core/entities';
import { UserPort } from '../domain/ports';
import { IUser, ICreateUser, IUpdateUser } from '../domain/interfaces';

@Injectable()
export class UserRepository extends UserPort {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {
        super();
    }

    async create(userData: ICreateUser): Promise<IUser> {
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<IUser[]> {
        return await this.userRepository.find({
            where: { status: true }
        });
    }

    async findById(id: number): Promise<IUser | null> {
        return await this.userRepository.findOne({
            where: { id, status: true }
        });
    }

    async findByUsername(username: string): Promise<IUser | null> {
        return await this.userRepository.findOne({
            where: { username, status: true }
        });
    }

    async update(id: number, userData: IUpdateUser): Promise<IUser | null> {
        await this.userRepository.update(id, userData);
        return await this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.userRepository.update(id, { 
            status: false,
            deletedAt: new Date()
        });
        return result.affected > 0;
    }
}
