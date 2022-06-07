import { Transaction } from "./Transaction";

export class Receipt {
  private generationDate: Date;
  private transaction: Transaction;
  private id: number;

  constructor(generationDate: Date, transaction: Transaction, id?: number) {
    this.generationDate = generationDate;
    this.transaction = transaction;
    this.id = id;
  }
}