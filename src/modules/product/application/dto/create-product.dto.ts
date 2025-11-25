import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({
        description: 'Nombre del producto',
        example: 'Laptop Dell',
        required: true,
    })
    name: string;

    @ApiProperty({
        description: 'Descripción del producto',
        example: 'Laptop Dell Inspiron 15 3000',
        required: true,
    })
    description: string;

    @ApiProperty({
        description: 'Precio del producto',
        example: 1200.50,
        required: true,
    })
    price: number;

    @ApiProperty({
        description: 'Cantidad en stock',
        example: 10,
        required: true,
    })
    stock: number;

    @ApiProperty({
        description: 'ID de la categoría del producto',
        example: 1,
        required: false,
    })
    productCategoryId?: number;
}
