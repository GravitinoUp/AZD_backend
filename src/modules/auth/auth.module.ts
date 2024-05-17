import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Auth } from './entities/auth.entity'
import { UserModule } from '../user/user.module'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
