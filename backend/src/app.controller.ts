import { All, Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All('*')
  getHTML(@Res() res: Response) {
    // return this.appService.getHello();
    return res.sendFile(path.join(__dirname, '..', 'public', 'build', 'index.html'));
  }
}
