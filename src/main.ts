import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './modules/app/app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  //TYPEORM NEST
  const app = await NestFactory.create(AppModule, {})
  const configService = app.get(ConfigService)

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://localhost:3001',
      'http://localhost:3000',
      'https://localhost:3000',
      'http://localhost',
      'https://localhost',
    ],
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })

  const port = configService.get('port')

  app.useGlobalPipes(new ValidationPipe())

  // APP START
  await app.listen(port)
}
bootstrap()
