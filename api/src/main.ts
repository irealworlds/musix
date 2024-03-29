import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from "@api/app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bootstrap Swagger
  const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Add validation
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  // Enable CORS
  app.enableCors();

  // Start listening for connections
  await app.listen(3000);
}
bootstrap().then(() => {
  // Do nothing
});
