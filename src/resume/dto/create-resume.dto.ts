import { IsNotEmpty } from "class-validator";
import { User } from "../../user/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateResumeDto {

  @ApiProperty()
  @IsNotEmpty({"message" : "data cannot be empty"})
  data: any;

  @IsNotEmpty({"message" : "Seems like something went wrong! please try again"})
  user : User
}
