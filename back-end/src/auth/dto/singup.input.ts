import { IsEmail, IsNotEmpty, IsTimeZone, MaxLength, MinLength } from "class-validator";

export class SingUpInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  image: string;

  @MinLength(10)
  @MaxLength(20)
  quote?: string;

  @IsTimeZone()
  timezone?: string;
}
