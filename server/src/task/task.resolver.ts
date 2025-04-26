// src/task/task.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './dto/task.model';
import { CreateTaskInput } from './dto/create-task.input';

@Resolver(of => Task)
export class TaskResolver {
  constructor(private readonly service: TaskService) {}

  @Query(returns => [Task], { name: 'tasks' })
  findAll() {
    return this.service.findAll();
  }

  @Mutation(returns => Task)
  createTask(@Args('data') data: CreateTaskInput) {
    return this.service.create(data);
  }

  @Mutation(returns => Task)
  toggleTask(@Args('id', { type: () => Int }) id: number) {
    return this.service.toggleCompleted(id);
  }
}
