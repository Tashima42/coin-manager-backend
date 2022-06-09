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
}
