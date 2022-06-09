import {GetCollectionCoinsUseCase} from "./get-collection-coins-use-case"
import {GetCollectionCoinsController} from "./get-collection-coins-controller"
import {sqliteDatabase} from "../../index"
import {SqliteCoinRepository} from "../../repositories/implementations/Sqlite/SqliteCoinRepository"


const coinRepository = new SqliteCoinRepository(sqliteDatabase)
const getCollectionCoinsUseCase = new GetCollectionCoinsUseCase(coinRepository)

const getCollectionCoinsController = new GetCollectionCoinsController(getCollectionCoinsUseCase)

export {getCollectionCoinsController}
