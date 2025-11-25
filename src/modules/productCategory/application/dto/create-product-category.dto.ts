import { ApiProperty } from '@nestjs/swagger';

export class CreateProductCategoryDto {
    @ApiProperty({
        description: 'Nombre de la categoría',
        example: 'Electrónicos',
        required: true,
    })
    name: string;

    @ApiProperty({
        description: 'Descripción de la categoría',
        example: 'Productos electrónicos y tecnológicos',
        required: false,
    })
    description?: string;
}
