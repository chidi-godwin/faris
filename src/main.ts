import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientKnownRequestErrorFilter } from './filters/prismaError.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // enable global prisma error filter
  app.useGlobalFilters(new PrismaClientKnownRequestErrorFilter());

  // configure swagger api documentation
  const config = new DocumentBuilder()
    .setTitle('Faris Transactions 1.0')
    .setDescription('Faris Transactios API Documentation')
    .setVersion('1.0')
    .addTag('Transactions')
    .addTag('Merchants')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
