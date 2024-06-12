import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { PrismaService } from 'prisma/prisma.service';

import { TodosModule } from 'src/todos/todos.module';

@Module({
  imports: [TodosModule],
  controllers: [BoardsController],
  providers: [BoardsService, PrismaService],
})
export class BoardsModule {}
