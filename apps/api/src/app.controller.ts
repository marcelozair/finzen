import { Response } from 'express';
import { Controller, Res, Get } from '@nestjs/common';

@Controller()
export class AuthController {
  @Get()
  async initial(@Res() res: Response) {
    return res.json({ message: 'successful' });
  }
}
