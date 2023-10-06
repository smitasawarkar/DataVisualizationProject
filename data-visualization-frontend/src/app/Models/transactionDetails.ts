export class TransactionDetails {
  userId: number;
  txnId: any;
  amount: number;
  bank: string;
  cardType: string;
  city: string;
  expType: string;
  gender: string;
  txnTime: Date;
  status: string;
  updatedTime: Date;
  constructor() {
    this.userId = 0;
    this.amount = 0;
    this.bank = '';
    this.cardType = '';
    this.city = '';
    this.expType = '';
    this.gender = '';
    this.txnTime = new Date();
    this.status = Status.Unknown;
    this.updatedTime = new Date();

  }
}
export enum Status{
    Success = 'Success',
  Fail = 'Fail',
  InProgress = 'InProgress',
  Unknown='Unknown'

}
