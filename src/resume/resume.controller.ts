import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";

import { Resume } from "./entities/resume.entity";
import { ResumeService } from "./resume.service";
import { ApiTags } from "@nestjs/swagger";

@Crud({
  model: {
    type: Resume,
  },
})

@ApiTags('resumes')
@Controller("resumes")
export class ResumeController implements CrudController<Resume> {
  constructor(public service: ResumeService) {}
}
