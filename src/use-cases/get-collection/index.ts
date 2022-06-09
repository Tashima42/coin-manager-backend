import {GetCollectionUseCase} from "./get-collection-use-case";
import {GetCollectionController} from "./get-collection-controller";
import {SqliteCollectionRepository} from "../../repositories/implementations/Sqlite/SqliteCollectionRepository"
import {sqliteDatabase} from "../../index"

const collectionRepository = new SqliteCollectionRepository(sqliteDatabase)

const getCollectionUseCase = new GetCollectionUseCase(collectionRepository)

const getCollectionController = new GetCollectionController(getCollectionUseCase)

export {getCollectionController}
