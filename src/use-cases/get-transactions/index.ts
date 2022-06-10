import {GetTransactionsUseCase} from "./get-transactions-use-case"
import {GetTransactionsController} from "./get-transactions-controller"
import {sqliteDatabase} from "../../index"
import {SqliteTransactionRepository} from "../../repositories/implementations/Sqlite/SqliteTransactionRepository"


const transactionRepository = new SqliteTransactionRepository(sqliteDatabase)
const getTransactionsUseCase = new GetTransactionsUseCase(transactionRepository)

const getTransactionsController = new GetTransactionsController(getTransactionsUseCase)

export {getTransactionsController}
