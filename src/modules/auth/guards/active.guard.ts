import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { I18nService } from 'nestjs-i18n'
import { UserService } from 'src/modules/user/user.service'

@Injectable()
export class ActiveGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let user
    if (context.getType().toString() === 'graphql') {
      const ctx = GqlExecutionContext.create(context)
      const req = ctx.getContext().req

      user = req.user
    } else {
      user = context.switchToHttp().getRequest()
    }

    if (!user) {
      throw new UnauthorizedException(this.i18n.t('errors.user_deactivated'))
    }

    const canActivate = await this.userService.canUserActivate(user.user_uuid)

    if (canActivate) {
      return canActivate
    } else {
      throw new ForbiddenException(this.i18n.t('errors.user_deactivated'))
    }
  }
}
