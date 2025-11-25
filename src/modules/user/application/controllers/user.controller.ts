import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserService, FindUserService, UpdateUserService, DeleteUserService } from '../use-cases';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserService: CreateUserService,
        private readonly findUserService: FindUserService,
        private readonly updateUserService: UpdateUserService,
        private readonly deleteUserService: DeleteUserService,
    ) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.createUserService.execute(createUserDto);
    }

    @Get()
    async findAll() {
        return await this.findUserService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.findUserService.findById(id);
    }

    @Get('username/:username')
    async findByUsername(@Param('username') username: string) {
        return await this.findUserService.findByUsername(username);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.updateUserService.execute(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.deleteUserService.execute(id);
    }
}
