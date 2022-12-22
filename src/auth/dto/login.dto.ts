import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty()
  @IsEmail({"message" : "Enter a valid email adress"})
  email: number;

  @ApiProperty()
  @IsNotEmpty({"message" : "Password field cannot be empty"})
  password: string;
}
