import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Auth } from './entities/auth.entity'
import { UserModule } from '../user/user.module'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthResolver } from './auth.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), UserModule],
  providers: [AuthService, JwtStrategy, AuthResolver],
})
export class AuthModule {}
