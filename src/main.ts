import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Environment } from './shared/domain/Environment';

async function bootstrap() {
  const PORT = process.env.PORT ?? 3000;
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  if (process.env.ENVIRONMENT !== Environment.PROD) {
    const config = new DocumentBuilder()
      .setTitle('Buenro Api')
      .setDescription('Api to handle data')
      .setVersion('1.0.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  await app.listen(PORT).then(() => {
    logger.log(`Application listening on PORT: ${PORT}`);
  });
}
bootstrap()
  .then(() => {
    const logger = new Logger();
    logger.log('Server runing...');
  })
  .catch((error) => {
    const logger = new Logger();
    logger.error('Error on bootstrap:', error);
  });
