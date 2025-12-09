import { IsEnum } from 'class-validator';
import { EUserRole } from 'src/core/enums/role.enum';

export class UpdateRoleDto {
  @IsEnum(EUserRole, { message: 'El rol debe ser USER o ADMIN' })
  rol: EUserRole;
}
