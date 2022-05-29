import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(helmet());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Expecto Patronum')
    .setDescription(
      'Expecto Patronum API description',
    )
    .setVersion('1.0')
    .addTag('Expecto Patronum')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string,
    ) => methodKey,
  };
  const document = SwaggerModule.createDocument(
    app,
    config,
    options,
  );

  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
