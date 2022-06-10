import {CreateListingUseCase} from "./create-listing-use-case"
import {CreateListingController} from "./create-listing-controller"
import {SqliteListingRepository} from "../../repositories/implementations/Sqlite/SqliteListingRepository"
import {SqliteCoinRepository} from "../../repositories/implementations/Sqlite/SqliteCoinRepository"
import {sqliteDatabase} from "../../index"


const listingRepository = new SqliteListingRepository(sqliteDatabase)
const coinRepository = new SqliteCoinRepository(sqliteDatabase)
const createListingUseCase = new CreateListingUseCase(listingRepository, coinRepository)

const createListingController = new CreateListingController(createListingUseCase)

export {createListingController}
