import { Bank } from "./Bank";

/* REDUX */

export interface WalletState {
  wallets: Wallet[];
  selected: Wallet | null;
}

/* INTERFACES */

export enum EnumWalletType {
  CREDIT = 'credit',
  DEBIT = 'debit',
  CASH = 'cash',
}


export enum EnumWalletTypeId {
  CASH = 1,
  CREDIT = 2,
  DEBIT = 3,
  SERVICE = 4,
}

export interface WalletType {
  id: number;
  icon: string;
  color: string;
  name: EnumWalletType;
}

export interface Wallet {
  id: number;
  name: string;
  color: string;
  balance: number;
  accountNumber: string;
  dueDate: string | null;
  closingDate: string | null;
  
  bankId: number;
  bank: Bank;

  typeId: number;
  type: WalletType;
}

/* API RESPONSE */

export interface IGetWalletsResponse {
  message: string;
  success: boolean;
  data: Wallet[];
}

export interface IGetWalletsTypeResponse {
  message: string;
  success: boolean;
  data: WalletType[];
}

/* FORM INTERFACES */

export interface ICreateWalletForm {
  name: string,
  typeId: number,
  color: string;
  balance: number;
  bankId: number | null,
  accountNumber: string,
  closingDate: number | null;
  dueDate: number | null;
}

export interface ICreateWalletPayload extends ICreateWalletForm {}