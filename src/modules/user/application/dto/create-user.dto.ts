import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'Nombre de usuario único',
        example: 'johndoe',
        required: true,
    })
    username: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'password123',
        required: true,
    })
    password: string;

    @ApiProperty({
        description: 'Estado del usuario',
        example: 'ACTIVE',
        required: false,
        default: 'INACTIVE',
    })
    userStatusCode?: string;
}
