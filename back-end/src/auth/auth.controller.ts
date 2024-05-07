import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SingUpInput } from "./dto/singup.input";
import { SingInInput } from "./dto/singin.input";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("singup")
  async singUpUser(@Body() data: SingUpInput): Promise<{ token: string }> {
    return this.authService.singUp(data)
  }

  @Post("singin")
  async singInUser(@Body() data: SingInInput): Promise<{ token: string }> {
    return this.authService.singIn(data.email, data.password)
  }
}
