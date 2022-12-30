import { Controller, Get, Param, Header, StreamableFile, Res } from "@nestjs/common";
import { GenerateService } from "./generate.service";
import { authorize, createfile, deleteFile } from "./gdrive";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Controller('generate')
export class GenerateController {
  constructor(private generateService: GenerateService, private httpService: HttpService) {
  }

  @Get(':id/docx')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
  @Header('Content-Disposition', 'attachment; filename="resume.docx"')
  async getDocx(@Param('id') id: number): Promise<StreamableFile> {
    const file = await this.generateService.generateResume(id);
    return new StreamableFile(file);
  }

  @Get(':id/pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="resume.pdf"')
  async getPdf(@Param('id') id: number) {
    const newReport = await this.generateService.generateResume(id);

    const authClient = await authorize();
    const file = await createfile(authClient, `resume-${Date.now()}.docx`, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', newReport);
    const pdfUrl = `https://docs.google.com/feeds/download/documents/export/Export?id=${file.id}&exportFormat=pdf`;
    const { data } = await firstValueFrom(this.httpService.get(pdfUrl, { responseType: "stream" }));
    deleteFile(authClient, file.id);
    return new StreamableFile(data);
  }

  @Get(':id/epub')
  @Header('Content-Type', 'application/epub+zip')
  @Header('Content-Disposition', 'attachment; filename="resume.epub"')
  async getEpub(@Param('id') id: number) {
    const newReport = await this.generateService.generateResume(id);

    const authClient = await authorize();
    const file = await createfile(authClient, `resume-${Date.now()}.docx`, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', newReport);
    const pdfUrl = `https://docs.google.com/feeds/download/documents/export/Export?id=${file.id}&exportFormat=epub`;
    const { data } = await firstValueFrom(this.httpService.get(pdfUrl, { responseType: "stream" }));
    deleteFile(authClient, file.id);
    return new StreamableFile(data);
  }

  @Get(':id/html')
  async getHtml(@Param('id') id: number, @Res() res) {
    const newReport = await this.generateService.generateResume(id);

    const authClient = await authorize();
    const file = await createfile(authClient, `resume-${Date.now()}.docx`, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', newReport);
    const pdfUrl = `https://docs.google.com/feeds/download/documents/export/Export?id=${file.id}&exportFormat=html`;
    const { data } = await firstValueFrom(this.httpService.get(pdfUrl));
    deleteFile(authClient, file.id);
    res.send(data);
  }
}

