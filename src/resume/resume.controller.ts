import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Resume } from "./entities/resume.entity";

@Controller('resume')
@ApiTags('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @ApiCreatedResponse({ type: Resume })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createResumeDto: CreateResumeDto) {
    return this.resumeService.create(createResumeDto);
  }

  @ApiOkResponse({ type: Resume, isArray: true })
  @Get()
  findAll() {
    return this.resumeService.findAll();
  }

  @ApiOkResponse({ type: Resume })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    let book = await this.resumeService.findOne(+id)
    if(book) return res.status(HttpStatus.OK).json(book)
    return res.status(HttpStatus.NOT_FOUND).json({"error" : "This resource  no longer exist or has been removed"})
  }

  @ApiOkResponse({ type: Resume })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() UpdateResumeDto: UpdateResumeDto, @Res() res: Response) {
    const response = await this.resumeService.update(+id, UpdateResumeDto);
    if(response) return res.status(HttpStatus.OK).json({"message" : "Book information updated successfully"});
    return res.status(HttpStatus.NOT_FOUND).json({"error" : "The resource to be updated no longer exist"})
  }


  @ApiOkResponse({ type: Resume })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.resumeService.remove(+id);
    res.status(HttpStatus.OK).json({"message" : "Book details deleted successfully"});
  }
}
