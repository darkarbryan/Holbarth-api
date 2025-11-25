import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({
        description: 'Nombre de usuario único',
        example: 'johndoe',
        required: false,
    })
    username?: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'password123',
        required: false,
    })
    password?: string;

    @ApiProperty({
        description: 'Estado del usuario',
        example: 'ACTIVE',
        required: false,
    })
    userStatusCode?: string;
}
