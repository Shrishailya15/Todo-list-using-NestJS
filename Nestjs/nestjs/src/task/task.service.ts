import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async getTasks(id: number) {
    const tasks = await this.taskRepository.findBy({
      user: { id },
    });
    return tasks;
  }

  async createTask(user: any, title: string, description: string) {
    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    task.done = false;
    task.created_at = new Date();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    task.user = user;
    await this.taskRepository.save(task);
    return task;
  }

  async updateTask() {}

  async deleteTask(userId: number, taskId: number) {
    await this.taskRepository.delete({
      id: taskId,
      user: { id: userId },
    });
    return { message: 'Task deleted successfully' };
  }
}
