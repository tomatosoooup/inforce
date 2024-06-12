import { NestFactory } from '@nestjs/core';

import { BoardsModule } from './boards/boards.module';

async function bootstrap() {
  const app = await NestFactory.create(BoardsModule);
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
