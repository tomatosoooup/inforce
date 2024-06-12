import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(private readonly prismaService: PrismaService) {}

  // I've decided to NOT use repositories architecture to speed up the process. But if it's needed I can easily apply it

  create(createBoardDto: CreateBoardDto): Promise<Board | null> {
    return this.prismaService.board.create({ data: { ...createBoardDto } });
  }

  findAll(): Promise<Board[] | null> {
    return this.prismaService.board.findMany();
  }

  findOne(id: string): Promise<Board> {
    return this.prismaService.board.findUnique({
      where: { id },
      include: { todo: true },
    });
  }

  update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    return this.prismaService.board.update({
      where: { id },
      data: { ...updateBoardDto },
    });
  }

  remove(id: string): Promise<Board> {
    return this.prismaService.board.delete({
      where: { id },
    });
  }
}
