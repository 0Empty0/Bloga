import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
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
  getUser(@Request() request: { user: User }): User {
    return request.user
  }

  @Post("register")
  async registerUser(@Body() data: Prisma.UserCreateInput): Promise<string> {
    return this.userService.create(data)
  }

  @Post("login")
  async loginUser(@Body() data: Prisma.UserWhereUniqueInput): Promise<{ token: string }> {
    return this.userService.login(data)
  }

}
