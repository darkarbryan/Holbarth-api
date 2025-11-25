import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
    @ApiProperty({
        description: 'Nombre del producto',
        example: 'Laptop Dell',
        required: false,
    })
    name?: string;

    @ApiProperty({
        description: 'Descripción del producto',
        example: 'Laptop Dell Inspiron 15 3000',
        required: false,
    })
    description?: string;

    @ApiProperty({
        description: 'Precio del producto',
        example: 1200.50,
        required: false,
    })
    price?: number;

    @ApiProperty({
        description: 'Cantidad en stock',
        example: 10,
        required: false,
    })
    stock?: number;

    @ApiProperty({
        description: 'ID de la categoría del producto',
        example: 1,
        required: false,
    })
    productCategoryId?: number;
}
