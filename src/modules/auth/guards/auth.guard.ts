import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JsonWebTokenError } from 'jsonwebtoken'
import { AppErrors } from 'src/common/constants/errors'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    try {
      if (info instanceof JsonWebTokenError) {
        throw new UnauthorizedException(AppErrors.INVALID_JWT)
      }

      const result = super.handleRequest(err, user, info, context, status)

      return result
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
