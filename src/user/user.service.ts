import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }

  async findByEmail(data: number | any): Promise<User | undefined> {
    return await this.repo.findOneBy({
      email: data.email
    });
  }

  async create(data) {
    return await this.repo.save(data).then(res => res).catch(e => console.log(e));
  }
}
