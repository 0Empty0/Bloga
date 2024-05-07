import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import { PasswordService } from "./password.service";


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) { }


  async singUp(data: Prisma.UserCreateInput): Promise<{ token: string }> {
    const hashedPassword = await this.passwordService.hashPassword(data.password)

    try {
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        }
      })

      return {
        token: await this.jwtService.signAsync(
          { id: user.id }
        )
      }

    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${data.email} already used.`);
      }
      throw new Error(e);
    }
  }

  async singIn(email: string, password: string): Promise<{ token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPassowrdCorrect = await this.passwordService.validatePassword(password, user.password)

    if (!isPassowrdCorrect) {
      throw new BadRequestException('Invalid password');
    }

    return {
      token: this.generateAccessToken(
        { id: user.id }
      )
    }
  }

  validateUser(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  private generateAccessToken(payload: { id: number }): string {
    return this.jwtService.sign(payload);
  }
}
