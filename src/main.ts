import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './modules/app/app.module'
import { AppStrings } from './common/constants/strings'
import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { ValidationError } from 'class-validator'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})
  const configService = app.get(ConfigService)

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://localhost:3001',
      'http://localhost:3000',
      'https://localhost:3000',
      'http://localhost:8080',
      'https://localhost:8080',
      'http://localhost',
      'https://localhost',
      'https://frontend.azd-dev.gravitino.ru',
      'http://frontend.azd-dev.gravitino.ru',
      'https://backend.azd-dev.gravitino.ru',
      'http://backend.azd-dev.gravitino.ru',
    ],
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle(AppStrings.APP_NAME)
    .setDescription(AppStrings.APP_DESCRIPTION)
    .setVersion(AppStrings.APP_VERSION)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build()

  const port = configService.get('port')

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors.join(' '))
      },
    }),
  )

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      persistAuthorization: true,
    },
    customSiteTitle: AppStrings.APP_NAME,
  })

  await app.listen(port)
}
bootstrap()
