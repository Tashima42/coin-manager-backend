import {ICoinRepository} from "../../ICoinRepository";
import {Coin} from "../../../entities/Coin"
import {SqliteDatabase} from "./index";

export class SqliteCoinRepository implements ICoinRepository {
  constructor(private sqliteDatabase: SqliteDatabase) {}
  async findAll(): Promise<Array<Coin>> {
    let coinsFound = null
    coinsFound = await this.sqliteDatabase.db.all(`SELECT id, name, image, price, year FROM coin;`)
    if (!Array.isArray(coinsFound)) coinsFound = [coinsFound]
    const coins = coinsFound.map((coin: any) => {
      return new Coin(coin.name, coin.price, coin.image, coin.year, coin.id)
    })
    return coins
  }
  async findByCollectionId(id: number): Promise<Array<Coin>> {
    let coinsFound = null
    coinsFound = await this.sqliteDatabase.db.all(`SELECT coin.id, coin.name, coin.image, coin.price, coin.year 
                                                  FROM collection_coin 
                                                  JOIN coin ON coin.id = collection_coin.coin_id 
                                                  WHERE collection_coin.collection_id = ?;`, id)
    if (!Array.isArray(coinsFound)) coinsFound = [coinsFound]
    const coins = coinsFound.map((coin: any) => {
      return new Coin(coin.name, coin.price, coin.image, coin.year, coin.id)
    })
    return coins
  }
  async addToCollection(collection_id: number, coin_id: number): Promise<void> {
    await this.sqliteDatabase.db.run(`INSERT INTO collection_coin (collection_id, coin_id) VALUES (?, ?);`, collection_id, coin_id)
  }
}
