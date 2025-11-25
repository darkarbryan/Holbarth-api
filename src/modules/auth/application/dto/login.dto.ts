import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        description: 'Nombre de usuario',
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
}
