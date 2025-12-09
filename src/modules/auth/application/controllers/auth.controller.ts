import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { LogInService } from '../use-cases/log-in';
import { LoginDto, UpdateRoleDto } from '../dto';
import { Public } from '../../public.decorator';
import { JwtAuthGuard } from '../../jwt-auth.guard';
import { RolesGuard } from '../../roles.guard';
import { Roles } from '../../roles.decorator';
import { EUserRole } from 'src/core/enums/role.enum';
import { FindUserService, UpdateUserService } from '../use-cases';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly logInService: LogInService,
    private readonly findUserService: FindUserService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.logInService.execute(loginDto);
  }

  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
  async getAllUsers() {
    const users = await this.findUserService.findAll();
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  @Patch('users/:id/role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(EUserRole.ADMIN)
  async updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    const updatedUser = await this.updateUserService.execute(id, {
      role: updateRoleDto.rol,
    });
    const { password, ...userWithoutPassword } = updatedUser!;
    return userWithoutPassword;
  }
}
