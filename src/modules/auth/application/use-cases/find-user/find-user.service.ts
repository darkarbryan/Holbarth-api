import { Injectable } from '@nestjs/common';
import { UserPort } from '../../../domain/ports';
import { IUser } from '../../../domain/interfaces';

/**
 * Service for finding users
 */
@Injectable()
export class FindUserService {
    constructor(private readonly userPort: UserPort) {}

    async findAll(): Promise<IUser[]> {
        return await this.userPort.findAll();
    }

    async findById(id: number): Promise<IUser | null> {
        return await this.userPort.findById(id);
    }

    async findByUsername(username: string): Promise<IUser | null> {
        return await this.userPort.findByUsername(username);
    }
}
