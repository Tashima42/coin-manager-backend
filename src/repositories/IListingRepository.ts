import {Listing} from "../entities/Listing"

export interface IListingRepository {
  findAll(): Promise<Array<Listing>>
  disable(id: number): Promise<void>
  setTradedCoin(id: number, tradedCoinId: number): Promise<void>
}
