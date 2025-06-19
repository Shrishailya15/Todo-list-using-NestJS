import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.userService.signup(name, email, password);
  }

  @Post('/signin')
  async signin(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.userService.signin(email, password);
  }
}
