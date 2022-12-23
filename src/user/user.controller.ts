import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";

import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

@Crud({
  model: {
    type: User,
  },
})

@ApiTags('users')
@Controller("users")
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
