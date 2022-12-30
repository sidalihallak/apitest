import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from "rxjs";
import { ResumeService } from "../resume/resume.service";
import path from "path";
const createReport = require('docx-templates').default;

@Injectable()
export class GenerateService {
  constructor(private readonly httpService: HttpService, private readonly resumeService : ResumeService) {}

  async generateResume(id: number) {
    const resume = await this.resumeService.findById(id);
    const data = JSON.parse(resume.data);
    const filePath = "dist/templates/" + data.meta.theme + ".docx"
    const template = fs.readFileSync(filePath)
    const newReport = await createReport({
      template,
      data: data,
      cmdDelimiter: ['{', '}'],
      additionalJsContext: {
        getImage: async (url, size = 5) => {
          if(url) {
            const { data } = await firstValueFrom(this.httpService.get(url, { responseType: "text", responseEncoding: "base64"}));
            if(data) {
              return {width: size, height: size, data: data, extension: '.jpeg'};
            }
          }
          return {width: size, height: size, data: null, extension: '.jpeg'};
        },
      }
    });
    return newReport;
  }
}
