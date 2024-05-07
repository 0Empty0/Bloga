import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { AuthGuard } from './guargs/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("all")
  async getAllUsers(): Promise<User[]> {
    const users = this.userService.users({})

    return users;
  }

  @UseGuards(AuthGuard)
  @Get()
  user(@Request() request: { user: User }): User {
    return request.user
  }
}
