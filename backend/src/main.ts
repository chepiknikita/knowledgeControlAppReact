import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 8082;
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));

    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );

    const config = new DocumentBuilder()
      .setTitle('Knowledge-control-backend')
      .setDescription('Документация API')
      .setVersion('1.0.0')
      .addTag('DYK')
      .build();

    const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:3000';
    app.enableCors({
      origin: allowedOrigin,
      credentials: true,
    });

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, documentFactory);
    await app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
