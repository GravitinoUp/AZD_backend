import {
  Controller,
  Post,
  Body,
  Delete,
  HttpException,
  HttpStatus,
  Ip,
  Req,
  UseFilters,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { UserService } from '../user/user.service'
import { AuthDto } from './dto/auth.dto'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { Throttle } from '@nestjs/throttler'

@ApiTags('Auth')
@Controller('auth')
@UseFilters(AllExceptionsFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  @Throttle({ default: { limit: 1, ttl: 1000 } })
  @Post()
  async login(@Body() authDto: AuthDto, @Ip() ipAddress, @Req() request) {
    const user = await this.userService.authByEmail(authDto.email)
    if (!user) {
      throw new HttpException(
        await this.i18n.t('errors.user_not_found', { lang: I18nContext.current().lang }),
        HttpStatus.NOT_FOUND,
      )
    } else if (!user.is_active) {
      throw new HttpException(
        await this.i18n.t('errors.user_deactivated', { lang: I18nContext.current().lang }),
        HttpStatus.FORBIDDEN,
      )
    }

    return this.authService.login(authDto, {
      userAgent: request.headers['user-agent'],
      ipAddress: ipAddress,
    })
  }

  @Throttle({ default: { limit: 1, ttl: 1000 } })
  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refresh_token)
  }

  @Throttle({ default: { limit: 1, ttl: 1000 } })
  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refresh_token)
  }
}
