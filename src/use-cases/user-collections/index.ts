import {UserCollectionsUseCase} from "./user-collections-use-case";
import {UserCollectionsController} from "./user-collections-controller";
import {SqliteCollectionRepository} from "../../repositories/implementations/Sqlite/SqliteCollectionRepository"
import {sqliteDatabase} from "../../index"

const collectionRepository = new SqliteCollectionRepository(sqliteDatabase)

const userCollectionsUseCase = new UserCollectionsUseCase(collectionRepository)

const userCollectionsController = new UserCollectionsController(userCollectionsUseCase)

export {userCollectionsController}
