import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { TaskService } from './task.service';
  import { AuthGuard } from 'src/user/auth.guard';
  
  // AuthGuard here will mandate user to pass the JWT token everytime for every API call
  @UseGuards(AuthGuard)
  @Controller('task')
  export class TaskController {
    constructor(private readonly taskService: TaskService) {}
  
    @Get()
    getTasks(@Request() request) {
      // get the user object from the request
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const user = request['user'];
  
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return this.taskService.getTasks(user['id']);
    }
  
    @Post()
    createTask(
      @Request() request,
      @Body('title') title: string,
      @Body('description') description: string,
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const user = request['user'];
      return this.taskService.createTask(user, title, description);
    }
  
    @Put('/:id')
    updateTask() {}
  
    @Delete('/:id')
    deleteTask(@Request() request, @Param('id') id: number) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const user = request['user'];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      return this.taskService.deleteTask(user['id'], id);
    }
  }
  