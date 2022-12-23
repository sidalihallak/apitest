import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail({"email":email});
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getUserByEmail(email: string): Promise<any> {
    const user = await this.usersService.findByEmail({"email":email});
    return user;
  }
  async login(user: any) {
    const payload = {
      user : {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    };
    return {
      access_token: this.jwtService.sign(payload),
    };

  }

  async register(data) {
    console.log("data",  data)
    data.password = await bcrypt.hash(data.password, 10)
    let response = await this.usersService.create(data);
    if (response) {
      const { password, ...result } = response;
      return result;
    }
  }

  decodeToken(token) : any {
    return this.jwtService.decode(token)
  }
}
