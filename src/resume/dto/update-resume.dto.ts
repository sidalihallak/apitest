import { OmitType } from "@nestjs/mapped-types";
import { CreateResumeDto } from './create-resume.dto';

export class UpdateResumeDto extends OmitType(CreateResumeDto, [] as const) {
  id: number
}
