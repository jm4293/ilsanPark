import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { config } from 'dotenv';
import { Response } from 'express';
import * as path from 'path';

config();

@Controller('/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File): string {
    return process.env.FILE_URL + file.filename;
  }

  @Get(':imageName')
  getImage(@Param('imageName') imageName: string, @Res() response: Response) {
    return response.sendFile(path.join(__dirname, '..', '..', '..', 'public', 'file', imageName));
  }
}
