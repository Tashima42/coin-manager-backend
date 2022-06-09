import {GetListingsUseCase} from "./get-listings-use-case"
import {GetListingsController} from "./get-listings-controller"
import {SqliteListingRepository} from "../../repositories/implementations/Sqlite/SqliteListingRepository"
import {sqliteDatabase} from "../../index"


const listingRepository = new SqliteListingRepository(sqliteDatabase)
const getListingsUseCase = new GetListingsUseCase(listingRepository)

const getListingsController = new GetListingsController(getListingsUseCase)

export {getListingsController}
