import { Injectable, NotFoundException } from '@nestjs/common';
import { UserPort } from '../../../domain/ports';
import { IUser, IUpdateUser } from '../../../domain/interfaces';

/**
 * Service for updating a user
 */
@Injectable()
export class UpdateUserService {
    constructor(private readonly userPort: UserPort) {}

    async execute(id: number, userData: IUpdateUser): Promise<IUser | null> {
        const existingUser = await this.userPort.findById(id);
        if (!existingUser) {
            throw new NotFoundException('Usuario no encontrado');
        }

        if (userData.username && userData.username !== existingUser.username) {
            const userWithSameUsername = await this.userPort.findByUsername(userData.username);
            if (userWithSameUsername && userWithSameUsername.id !== id) {
                throw new Error('El nombre de usuario ya está en uso');
            }
        }

        return await this.userPort.update(id, userData);
    }
}
