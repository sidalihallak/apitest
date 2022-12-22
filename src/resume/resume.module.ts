import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Resume } from "./entities/resume.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Resume])],
  exports: [TypeOrmModule],
  controllers: [ResumeController],
  providers: [ResumeService]
})
export class ResumeModule {}
