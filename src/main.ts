import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const options = new DocumentBuilder()
        .setTitle('Kelp Assestment')
        .setDescription('Api Routes')
        .setVersion('1.0')
        .addServer('http://localhost:3000/', 'Local environment')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  await app.listen(configService.get<number>('PORT') ?? 3000);
}
bootstrap();
