import { Inject, Injectable } from "@nestjs/common";
import { Bank } from "../../database/schemas/bank.schema";
import { seedBanks } from "./seed";

@Injectable()
export class BankService {
  @Inject('BANK_REPOSITORY')
  private bankRepository: typeof Bank;
  
  async runSeed(): Promise<void> {
    await this.bankRepository.bulkCreate(seedBanks);
  }
  
  async getAllBanks(): Promise<Bank[]> {
    return this.bankRepository.findAll();
  }
}