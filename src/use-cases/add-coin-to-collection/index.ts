import {AddCoinToCollectionUseCase} from "./add-coin-to-collection-use-case"
import {AddCoinToCollectionController} from "./add-coin-to-collection-controller"
import {sqliteDatabase} from "../../index"
import {SqliteCoinRepository} from "../../repositories/implementations/Sqlite/SqliteCoinRepository"


const coinRepository = new SqliteCoinRepository(sqliteDatabase)
const addCoinToCollectionUseCase = new AddCoinToCollectionUseCase(coinRepository)

const addCoinToCollectionController = new AddCoinToCollectionController(addCoinToCollectionUseCase)

export {addCoinToCollectionController}
