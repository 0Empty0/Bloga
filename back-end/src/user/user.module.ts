import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from './user.controller';
import { AuthGuard } from "./guargs/auth.guard";
import { PasswordService } from "@/auth/password.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  providers: [UserService, JwtService, AuthGuard, PasswordService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
