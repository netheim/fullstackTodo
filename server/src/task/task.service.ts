// src/task/task.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// УБРАЛИ: import { Task as PrismaTask } from '@prisma/client';
import { CreateTaskInput } from './dto/create-task.input';

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateTaskInput) /*: Promise<PrismaTask> */ {
        return this.prisma.task.create({ data });
    }

    async findAll() /*: Promise<PrismaTask[]> */ {
        return this.prisma.task.findMany();
    }

    async toggleCompleted(id: number) /*: Promise<PrismaTask> */ {
        const task = await this.prisma.task.findUnique({ where: { id } });
        if (!task) throw new NotFoundException(`Task ${id} not found`);
        return this.prisma.task.update({
            where: { id },
            data: { completed: !task.completed },
        });
    }
}
