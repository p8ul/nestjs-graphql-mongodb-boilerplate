import { SetMetadata } from '@nestjs/common';
import { Permission } from 'src/common/global-types';
export const PERMISSIONS_METADATA_KEY = '__permissions__';

/**
 * @description
 * Attatches metadata to the resolver defining which permissions are required to execute the
 * operation, using one or more {@link Permission} values.
 *
 * @example
 * ```TypeScript
 *  \@Allow(Permission.SuperAdmin)
 *  \@Query()
 *  getAdministrators() {
 *      // ...
 *  }
 * ```
 *
 * @docsCategory request
 * @docsPage Allow Decorator
 */
export const Allow = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_METADATA_KEY, permissions);
