import {GetCoinsUseCase} from "./get-coins-use-case"
import {GetCoinsController} from "./get-coins-controller"
import {sqliteDatabase} from "../../index"
import {SqliteCoinRepository} from "../../repositories/implementations/Sqlite/SqliteCoinRepository"


const coinRepository = new SqliteCoinRepository(sqliteDatabase)
const getCoinsUseCase = new GetCoinsUseCase(coinRepository)

const getCoinsController = new GetCoinsController(getCoinsUseCase)

export {getCoinsController}
