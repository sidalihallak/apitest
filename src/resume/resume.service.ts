import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Resume } from "./entities/resume.entity";

@Injectable()
export class ResumeService extends TypeOrmCrudService<Resume> {
  constructor(@InjectRepository(Resume) repo) {
    super(repo);
  }
}

