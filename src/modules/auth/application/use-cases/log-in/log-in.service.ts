/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { LoginPort } from '../../../domain/ports';
import { ILogIn } from '../../../domain/interfaces';
import { JwtService } from '@nestjs/jwt';

/**
 * Service for user login authentication
 */
@Injectable()
export class LogInService {
  constructor(
    private readonly loginPort: LoginPort,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginData: ILogIn): Promise<{ access_token: string }> {
    const user = await this.loginPort.verifyCredentials(
      loginData.username,
      loginData.password,
    );
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
