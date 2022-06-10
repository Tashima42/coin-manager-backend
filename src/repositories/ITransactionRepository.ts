import {Transaction} from "../entities/Transaction"

export interface ITransactionRepository {
  create(date: Date, listingId: number, payment_method?: string): Promise<void>
  getByListingId(listingId: number): Promise<Transaction>
  getAll(): Promise<Array<Transaction>>
}
