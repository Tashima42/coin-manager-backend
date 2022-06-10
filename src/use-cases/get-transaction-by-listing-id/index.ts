import {GetTransactionByListingIdUseCase} from "./get-transaction-by-listing-id-use-case"
import {GetTransactionByListingIdController} from "./get-transaction-by-listing-id-controller"
import {sqliteDatabase} from "../../index"
import {SqliteTransactionRepository} from "../../repositories/implementations/Sqlite/SqliteTransactionRepository"


const transactionRepository = new SqliteTransactionRepository(sqliteDatabase)
const getTransactionByListingIdUseCase = new GetTransactionByListingIdUseCase(transactionRepository)

const getTransactionByListingIdController = new GetTransactionByListingIdController(getTransactionByListingIdUseCase)

export {getTransactionByListingIdController}
