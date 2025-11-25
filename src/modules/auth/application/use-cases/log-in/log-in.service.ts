import { Injectable } from '@nestjs/common';
import { LoginPort } from '../../../domain/ports';
import { ILogIn } from '../../../domain/interfaces';
import { IUser } from 'src/modules/user/domain/interfaces';

/**
 * Service for user login authentication
 */
@Injectable()
export class LogInService {
    constructor(private readonly loginPort: LoginPort) {}

    async execute(loginData: ILogIn): Promise<IUser | null> {
        const user = await this.loginPort.verifyCredentials(loginData.username, loginData.password);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }
        return user;
    }
}
