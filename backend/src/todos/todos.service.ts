import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTodoDto: CreateTodoDto) {
    return await this.prismaService.todo.create({ data: { ...createTodoDto } });
  }

  findAll(): Promise<Todo[] | null> {
    return this.prismaService.todo.findMany();
  }

  findOne(id: number): Promise<Todo | null> {
    return this.prismaService.todo.findUnique({ where: { id } });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return await this.prismaService.todo.update({
      where: { id },
      data: { ...updateTodoDto },
    });
  }

  async remove(id: number): Promise<Todo> {
    return this.prismaService.todo.delete({ where: { id } });
  }
}
