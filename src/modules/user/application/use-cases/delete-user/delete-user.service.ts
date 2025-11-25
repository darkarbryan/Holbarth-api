import { Injectable } from '@nestjs/common';
import { UserPort } from '../../../domain/ports';

/**
 * Service for deleting a user (soft delete)
 */
@Injectable()
export class DeleteUserService {
    constructor(private readonly userPort: UserPort) {}

    async execute(id: number): Promise<boolean> {
        const existingUser = await this.userPort.findById(id);
        if (!existingUser) {
            throw new Error('Usuario no encontrado');
        }
        return await this.userPort.delete(id);
    }
}
