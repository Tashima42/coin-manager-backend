import {CreateCollectionUseCase} from "./create-collection-use-case";
import {CreateCollectionController} from "./create-collection-controller";
import {SqliteCollectionRepository} from "../../repositories/implementations/Sqlite/SqliteCollectionRepository"
import {sqliteDatabase} from "../../index"

const collectionRepository = new SqliteCollectionRepository(sqliteDatabase)

const createCollectionUseCase = new CreateCollectionUseCase(collectionRepository)

const createCollectionController = new CreateCollectionController(createCollectionUseCase)

export {createCollectionController}
