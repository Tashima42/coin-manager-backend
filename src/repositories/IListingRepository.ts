import {Listing} from "../entities/Listing"

export interface IListingRepository {
  findAll(): Promise<Array<Listing>>
}
