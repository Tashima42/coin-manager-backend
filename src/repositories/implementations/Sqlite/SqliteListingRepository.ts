import {IListingRepository} from "../../IListingRepository";
import {Listing} from "../../../entities/Listing";
import {Coin} from "../../../entities/Coin"
import {SqliteDatabase} from "./index";

export class SqliteListingRepository implements IListingRepository {
  constructor(private sqliteDatabase: SqliteDatabase) {}
  async findAll(): Promise<Array<Listing>> {
    let listingsFound = null
    listingsFound = await this.sqliteDatabase.db.all(`SELECT 
            listing.id, listing.asking_price, listing.description, listing.enabled, listing.trade, listing.name, listed.name as listed_name, listed.id as listed_id,
            listed.image as listed_image, listed.price as listed_price, listed.year as listed_year, traded.name as traded_name, traded.id as traded_id,
            traded.image as traded_image, traded.price as traded_price, traded.year as traded_year
            FROM listing 
            LEFT JOIN coin listed ON listing.listed_coin = listed.id
            LEFT JOIN coin traded ON listing.traded_coin = traded.id;`)
    if (!Array.isArray(listingsFound)) listingsFound = [listingsFound]


    const listings = listingsFound.map((listing: any) => {
      const listedCoin = new Coin(listing.listed_name, listing.listed_price, listing.listed_image, listing.listed_year, listing.listed_id)
      let tradedCoin = null
      if (listing.traded_name) {
        tradedCoin = new Coin(listing.traded_name, listing.traded_price, listing.traded_image, listing.traded_year, listing.traded_id)
      }
      return new Listing(
        listing.asking_price,
        listing.name,
        listing.description,
        listing.enabled === 1,
        listing.trade === 1,
        listedCoin,
        tradedCoin,
        listing.id
      )
    })
    return listings
  }
  async disable(id: number): Promise<void> {
    await this.sqliteDatabase.db.run(`UPDATE listing SET enabled = FALSE WHERE id = ?`, id)
  }
  async setTradedCoin(id: number, tradedCoinId: number): Promise<void> {
    await this.sqliteDatabase.db.run(`UPDATE listing SET traded_coin = ? WHERE id = ?`, tradedCoinId, id)
  }
  async create(listing: Listing): Promise<void> {
    console.log({listing})
    const created = await this.sqliteDatabase.db.run(`INSERT INTO listing 
                                     (asking_price, name, description, enabled, trade, listed_coin, traded_coin) 
                                     VALUES (?, ?, ?, ?, ?, ?, ?)`,
      listing.getAskingPrice(), listing.getName(), listing.getDescription(), listing.getEnabled(), listing.getTrade(), listing.getListedCoin().getId(), null)
    console.log({created})
  }
}
