import { Response } from 'express';
import { Get, HttpStatus, Inject, Post } from '@nestjs/common';
import { Controller, Res, HttpCode } from '@nestjs/common';

import { BankService } from './bank.service';

@Controller('bank')
export class BankController {
  @Inject(BankService)
  private readonly bankService: BankService;

  @Post('seed')
  @HttpCode(HttpStatus.CREATED)
  async create(@Res() res: Response) {
    await this.bankService.runSeed();

    return res.json({
      message: 'Banks created',
      success: true,
    })
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Res() res: Response) {
    const banks = await this.bankService.getAllBanks();

    return res.json({
      message: 'successful',
      data: banks,
      success: true,
    })
  }
}
