import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LogInService } from '../use-cases/log-in';
import { LoginDto } from '../dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly logInService: LogInService) {}

    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiResponse({ status: 200, description: 'Login exitoso' })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
    async login(@Body() loginDto: LoginDto) {
        return await this.logInService.execute(loginDto);
    }
}
