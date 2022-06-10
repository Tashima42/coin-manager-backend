export class Transaction {
  private date: Date;
  private paymentMethod: string;
  private listingId: number;
  private id: number;

  constructor(date: Date, paymentMethod: string, listingId: number, id?: number) {
    this.date = date;
    this.paymentMethod = paymentMethod;
    this.listingId = listingId;
    this.id = id;
  }
}
