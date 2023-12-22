import { Response } from 'express';
import { Controller, Res, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async initial(@Res() res: Response) {
    return res.json({ message: 'successful' });
  }
}
