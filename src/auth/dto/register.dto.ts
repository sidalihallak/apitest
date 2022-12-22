import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty({"message" : "Name field cannot be empty"})
  name: string;

  @ApiProperty()
  @IsEmail({"message" : "Enter a valid email adress"})
  email: number;

  @ApiProperty()
  @IsNotEmpty({"message" : "Password field cannot be empty"})
  password: string;
}
