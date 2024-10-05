import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { User } from 'src/database/schemas/user.schema';
import { Controller, Res, HttpCode, Param, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction';
import { GetUser } from 'src/common/decorators/user.decorators';
import { Body, Get, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';

@Controller('transaction')
export class TransactionController {
  @Inject(TransactionService)
  private transactionService: TransactionService;

  @Post('create')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Res() res: Response, @Body() body: CreateTransactionDto, @GetUser() user: User) {
    const transactions = await this.transactionService.createTransaction(
      body,
      user.profileId
    );

    return res.json({
      message: 'Transaction created successful',
      data: transactions,
      success: true,
    })
  }

  @Get('/:walletId')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Res() res: Response,
    @Param() params: { walletId: number},
    @Query() query: { page: number; limit: number },
    @GetUser() user: User
  ) {
    const { walletId } = params;
    const { page = 1, limit = 20 } = query;
  
    const response = await this.transactionService.getWithPagination(
      user.profileId,
      walletId,
      page,
      limit,
    );

    return res.json({
      message: 'successful',
      data: response,
      success: true,
    })
  }
}
