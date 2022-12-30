import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GenerateController } from './generate.controller';
import { GenerateService } from './generate.service';
import { ResumeModule } from "../resume/resume.module";
import { ResumeService } from "../resume/resume.service";

@Module({
  imports: [HttpModule, ResumeModule],
  controllers: [GenerateController],
  providers: [GenerateService, ResumeService],
  exports: [GenerateModule]
})
export class GenerateModule {}
