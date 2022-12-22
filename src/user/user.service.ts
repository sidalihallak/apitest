import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(data: number | any): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({
      email: data.email
    });
  }

  async create(data)  {
    return await this.usersRepository.save(data).then(res => res).catch(e => console.log(e));
  }
}
