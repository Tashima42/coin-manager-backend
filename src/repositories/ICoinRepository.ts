import {Coin} from "../entities/Coin"

export interface ICoinRepository {
  findAll(): Promise<Array<Coin>>
  findByCollectionId(id: number): Promise<Array<Coin>>
  addToCollection(collection_id: number, coin_id: number): Promise<void>
  findById(id: number): Promise<Coin>
}
