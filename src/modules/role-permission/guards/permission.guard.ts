import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RolePermissionService } from '../role-permission.service'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { PermissionEnum } from 'src/common/constants/permission.enum'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly rolesPermissionsService: RolePermissionService,
    private readonly i18n: I18nService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<PermissionEnum[]>('permissions', [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredPermissions) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()
    const result = await asyncSome(requiredPermissions, async (permission) => {
      return await this.rolesPermissionsService.checkPermission(permission, user.user_id)
    })

    if (result) {
      return result
    } else {
      throw new ForbiddenException(
        this.i18n.t('errors.access_denied', { lang: I18nContext.current().lang }),
      )
    }
  }
}

const asyncSome = async (array, predicate) => {
  for (const element of array) {
    if (await predicate(element)) return true
  }
  return false
}
