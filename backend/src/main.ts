import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    {
      cors: true,
      logger: console,
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      '*',
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET,PUT,POST,DELETE',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Accept',
    );
    next();
  });
  const config = new DocumentBuilder()
    .setTitle('Expecto Patronum')
    .setDescription(
      'Expecto Patronum API description',
    )
    .setVersion('1.0')
    .addTag('Expecto Patronum')
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
