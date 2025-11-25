import { Controller, Post, Body } from '@nestjs/common';
import { LogInService } from '../use-cases/log-in';
import { LoginDto } from '../dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly logInService: LogInService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.logInService.execute(loginDto);
    }
}
