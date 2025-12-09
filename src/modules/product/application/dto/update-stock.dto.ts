import { IsInt, Min } from 'class-validator';

export class UpdateStockDto {
  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock debe ser mayor o igual a 0' })
  stock: number;
}
