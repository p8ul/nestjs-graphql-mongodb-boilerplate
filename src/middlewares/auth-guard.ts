import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { extractToken } from 'src/common/extract-token';
import { parseContext } from 'src/common/parse-context';

import { Reflector } from '@nestjs/core';
import { Permission } from 'src/common/global-types';
import { PERMISSIONS_METADATA_KEY } from 'src/decorators/allow.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  stategy: any;
  constructor(
    private readonly userService: UserService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req } = parseContext(context);
    const permissions: Permission[] = this.reflector.get<Permission[]>(
      PERMISSIONS_METADATA_KEY,
      context.getHandler(),
    );

    if (permissions && permissions.includes(Permission.Public)) {
      return true;
    }
    const token = extractToken(req);
    const t = await this.userService.verifyToken(token);
    if (t) {
      return true;
    }
    return false;
  }
}
