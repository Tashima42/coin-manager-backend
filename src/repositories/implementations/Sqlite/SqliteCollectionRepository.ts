import {ICollectionRepository} from "../../ICollectionRepository"
import {Collection} from "../../../entities/Collection"
import {SqliteDatabase} from "./index";

export class SqliteCollectionRepository implements ICollectionRepository {
  constructor(private sqliteDatabase: SqliteDatabase) {}
  async findByUserId(userId: number): Promise<Array<Collection>> {
    let collectionsFound = null
    collectionsFound = await this.sqliteDatabase.db.all(`SELECT c.id, c.name, c.description 
       FROM collection c JOIN user_collection uc WHERE uc.collection_id = c.id AND uc.user_id = ?;`, userId)

    if (!Array.isArray(collectionsFound)) collectionsFound = [collectionsFound]
    const collections = collectionsFound.map((collectionFound: any) => {
      return new Collection(
        collectionFound.name,
        collectionFound.description,
        collectionFound.id
      )
    })

    return collections
  }
  async findById(id: number): Promise<Collection> {
    const collectionFound = await this.sqliteDatabase.db.get(`SELECT id, name, description FROM collection WHERE id = ?;`, id)
    return new Collection(
      collectionFound.name,
      collectionFound.description,
      collectionFound.id
    )
  }
}
