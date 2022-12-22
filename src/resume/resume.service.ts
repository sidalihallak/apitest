import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume } from "./entities/resume.entity";
import { Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ResumeService {

  constructor(
    @InjectRepository(Resume)
    private resumeRepository: Repository<Resume>,
  ) {}
  async create(data: object)  {
    return await this.resumeRepository.save(data).then(res => res);
  }

  findAll(): Promise<Resume[]> {
    return this.resumeRepository.find()
  }

  findOne(id: number): Promise<Resume> {
    return this.resumeRepository.findOneBy({
      id: id
    });
  }

  async update(id:number, data: object): Promise<Resume | UpdateResult | undefined> {
    const book = await this.findOne(id).then(res =>res);
    if(book) return await this.resumeRepository.update(id, data).then(res => res);
    return ;
  }

  async remove(id: number) {
    return await this.resumeRepository.delete(id);
  }
}
