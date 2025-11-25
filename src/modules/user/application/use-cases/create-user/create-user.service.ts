import { Injectable } from '@nestjs/common';
import { UserPort } from '../../../domain/ports';
import { IUser, ICreateUser } from '../../../domain/interfaces';

/**
 * Service for creating a new user
 */
@Injectable()
export class CreateUserService {
    constructor(private readonly userPort: UserPort) {}

    async execute(userData: ICreateUser): Promise<IUser> {
        const existingUser = await this.userPort.findByUsername(userData.username);
        if (existingUser) {
            throw new Error('Usuario ya existe');
        }
        return await this.userPort.create(userData);
    }
}
