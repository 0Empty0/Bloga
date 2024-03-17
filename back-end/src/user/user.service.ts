import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async users(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.UserWhereUniqueInput,
    where?: Prisma.UserWhereInput,
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    })
  }

  async create(data: Prisma.UserCreateInput): Promise<{ token: string }> {
    const hashedPassword = await hash(data.password, 10)

    try {
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        }
      })

      return {
        token: await this.jwtService.signAsync(
          { id: user.id, email: user.email }
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

  async login(data: Prisma.UserWhereUniqueInput): Promise<{ token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email }
    })

    if (!user) {
      throw new HttpException("Credentials are not valid", HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const isPassowrdCorrect = await compare(data.password, user.password)

    if (!isPassowrdCorrect) {
      throw new HttpException("Credentials are not valid", HttpStatus.UNPROCESSABLE_ENTITY)
    }

    return {
      token: await this.jwtService.signAsync(
        { sub: user.id, email: user.email }
      )
    }
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  generateJWT(data: Prisma.UserWhereUniqueInput) {
    return sign(
      {
        id: data.id,
        email: data.email,
      },
      process.env.JWT_SECRET
    )
  }
}
