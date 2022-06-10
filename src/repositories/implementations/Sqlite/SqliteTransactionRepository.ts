import {SqliteDatabase} from "./index";
import {Transaction} from "../../../entities/Transaction";
import {ITransactionRepository} from "../../ITransactionRepository"

export class SqliteTransactionRepository implements ITransactionRepository {
  constructor(private sqliteDatabase: SqliteDatabase) {}

  async getAll(): Promise<Array<Transaction>> {
    let transactionsFound = null
    transactionsFound = await this.sqliteDatabase.db.all(`SELECT id, date, payment_method, listing_id FROM 'transaction';`)
    if (!Array.isArray(transactionsFound)) transactionsFound = [transactionsFound]
    const transactions = transactionsFound.map((transaction: any) => {
      return new Transaction(new Date(transaction.date), transaction.payment_method, transaction.listing_id, transaction.id)
    })
    return transactions
  }
  async create(date: Date, listingId: number, payment_method?: string): Promise<void> {
    await this.sqliteDatabase.db.run(`INSERT INTO 'transaction' (date, payment_method, listing_id) VALUES (?, ?, ?);`,
      date.toISOString(), payment_method || null, listingId)
  }
  async getByListingId(listingId: number): Promise<Transaction> {
    const transaction = await this.sqliteDatabase.db.get(`SELECT id, date, payment_method, listing_id FROM 'transaction' WHERE listing_id = ?;`, listingId)
    return new Transaction(new Date(transaction.date), transaction.payment_method, transaction.listing_id, transaction.id)
  }
}
