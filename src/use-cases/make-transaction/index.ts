import {MakeTransactionUseCase} from "./make-transaction-use-case"
import {MakeTransactionController} from "./make-transaction-controller"
import {sqliteDatabase} from "../../index"
import {SqliteTransactionRepository} from "../../repositories/implementations/Sqlite/SqliteTransactionRepository"
import {SqliteListingRepository} from "../../repositories/implementations/Sqlite/SqliteListingRepository"


const listingRepository = new SqliteListingRepository(sqliteDatabase)
const transactionRepository = new SqliteTransactionRepository(sqliteDatabase)
const makeTransactionUseCase = new MakeTransactionUseCase(transactionRepository, listingRepository)

const makeTransactionController = new MakeTransactionController(makeTransactionUseCase)

export {makeTransactionController}
