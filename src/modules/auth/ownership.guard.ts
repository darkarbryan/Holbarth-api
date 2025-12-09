/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FindProductService } from 'src/modules/product/application/use-cases';
import { UserEntity } from 'src/core/entities/user.entity';
import { EUserRole } from 'src/core/enums/role.enum';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly findProductService: FindProductService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: UserEntity = request.user;
    const productId = request.params.id;

    if (!user) {
      return false;
    }

    if (user.role === EUserRole.ADMIN) {
      return true;
    }

    const product = await this.findProductService.findById(productId);
    if (product && product.creatorId === user.id) {
      return true;
    }

    throw new ForbiddenException(
      'You do not have permission to perform this action',
    );
  }
}
