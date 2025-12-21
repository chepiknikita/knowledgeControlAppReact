import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express'; // Добавьте этот импорт
import * as express from 'express';

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 8082;
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const staticPath = join(process.cwd(), 'static');

    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    app.use('/static', express.static(staticPath));

    const config = new DocumentBuilder()
      .setTitle('Knowledge-control-backend')
      .setDescription('Документация API')
      .setVersion('1.0.0')
      .addTag('DYK')
      .build();

    app.enableCors({
      origin: '*',
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
