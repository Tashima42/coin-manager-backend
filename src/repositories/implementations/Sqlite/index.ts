import sqlite3 from "sqlite3"
import {open} from "../../../../node_modules/sqlite/build/index"
import path from "path"

const databasePath = path.join(__dirname, '../../../../database.db')

export class SqliteDatabase {
  db: any;

  async connect(): Promise<any> {
    this.db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })
    this.db.on('trace', (data: any) => console.log(data))
  }

  async migrate(): Promise<void> {
    await this.createTableUser();
    await this.createTableCoin();
    await this.createTableCollection();
    await this.createTableUserCollection();
    await this.createTableCollectionCoin();
    await this.createTableListing();
    await this.createTableTransaction();
    await this.createTableAuthorizationToken();
  }
  async populate(): Promise<void> {
    await this.populateTableUser()
    await this.populateTableCoin()
    await this.populateTableCollection()
    await this.populateTableUserCollection()
    await this.populateTableCollectionCoin()
    await this.populateTableListing()
    await this.populateTableTransaction()
  }
  async dropAll(): Promise<void> {
    await this.dropTableUserCollection()
    await this.dropTableCollectionCoin()
    await this.dropTableAuthorizationToken()
    await this.dropTableCoin()
    await this.dropTableCollection()
    await this.dropTableListing()
    await this.dropTableUser()
    await this.dropTableTransaction()
  }

  async createTableUser(): Promise<void> {
    await this.db.exec(`CREATE TABLE IF NOT EXISTS user(
      id 'INTEGER' PRIMARY KEY,
      username 'TEXT' NOT NULL UNIQUE,
      password 'TEXT' NOT NULL,
      name 'TEXT' NOT NULL)`)
  }
  async createTableCoin(): Promise<void> {
    await this.db.exec(`CREATE TABLE IF NOT EXISTS coin(
      id 'INTEGER' PRIMARY KEY,
      name 'TEXT' NOT NULL,
      image 'TEXT',
      price 'TEXT',
      year 'INTEGER')`)
  }
  async createTableCollection(): Promise<void> {
    await this.db.exec(`CREATE TABLE IF NOT EXISTS collection(
      id 'INTEGER' PRIMARY KEY,
      description 'TEXT',
      name 'TEXT' NOT NULL)`)
  }
  async createTableUserCollection(): Promise<void> {
    await this.db.exec(`CREATE TABLE IF NOT EXISTS user_collection(
      id 'INTEGER' PRIMARY KEY,
      user_id 'INTEGER' NOT NULL,
      collection_id 'INTEGER' NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user (id),
      FOREIGN KEY (collection_id) REFERENCES collection (id))`)
  }
  async createTableCollectionCoin(): Promise<void> {
    await this.db.exec(`CREATE TABLE IF NOT EXISTS collection_coin(
      id 'INTEGER' PRIMARY KEY,
      collection_id 'INTEGER' NOT NULL,
      coin_id 'INTEGER' NOT NULL,
      FOREIGN KEY (collection_id) REFERENCES collection (id),
      FOREIGN KEY (coin_id) REFERENCES coin (id))`)
  }
  async createTableListing(): Promise<void> {
    await this.db.exec(`CREATE TABLE IF NOT EXISTS listing(
      id 'INTEGER' PRIMARY KEY,
      name 'TEXT',
      description 'TEXT',
      asking_price 'TEXT',
      listed_coin 'INTEGER' NOT NULL,
      traded_coin 'INTEGER',
      enabled 'BOOLEAN' DEFAULT TRUE NOT NULL,
      trade 'BOOLEAN' NOT NULL,
      FOREIGN KEY (listed_coin) REFERENCES coin (id),
      FOREIGN KEY (traded_coin) REFERENCES coin (id))`)
  }
  async createTableTransaction(): Promise<void> {
    await this.db.exec(`CREATE TABLE IF NOT EXISTS 'transaction'(
      id 'INTEGER' PRIMARY KEY,
      date 'TEXT' NOT NULL,
      payment_method 'TEXT',
      listing_id 'INTEGER' NOT NULL,
      FOREIGN KEY (listing_id) REFERENCES listing (id))`)
  }
  async createTableAuthorizationToken(): Promise<void> {
    await this.db.exec(`CREATE TABLE IF NOT EXISTS authorization_token(
      id 'INTEGER' PRIMARY KEY,
      user_id 'INTEGER' NOT NULL,
      token 'TEXT' NOT NULL UNIQUE,
      valid 'BOOLEAN' DEFAULT TRUE NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user (id))`)
  }


  async populateTableUser() {
    await this.db.run(`INSERT INTO user (
        username, password, name
      ) VALUES (?, ?, ?), (?, ?, ?)`,
      'user1@example.com',
      '$2b$10$P9PjYWou7PU.pDA3sx3DwuW1ny902LV13LVZsZGHlahuOUbsOPuBO',
      'User One',
      'user2@example.com',
      '$2b$10$P9PjYWou7PU.pDA3sx3DwuW1ny902LV13LVZsZGHlahuOUbsOPuBO',
      'User Two')
  }
  async populateTableCoin() {
    await this.db.run(`INSERT INTO coin (
        name, image, price, year
      ) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)`,
      'Um Centavo', 'image', '0.01', 2000,
      'Cinco Centavos', 'image', '0.05', 2000,
      'Dez Centavos', 'image', '0.10', 2000,
      'Vinte e Cinco Centavos', 'image', '0.25', 2000,
      'Cinquenta Centavos', 'image', '0.50', 2000,
      'Um Real', 'image', '1.00', 2000,
    )
  }
  async populateTableCollection() {
    await this.db.run(`INSERT INTO collection (
        name, description
      ) VALUES (?, ?) `,
      'Moedas Brasileiras', 'Moedas em cirulacao no Brasil')
  }
  async populateTableUserCollection() {
    await this.db.run(`INSERT INTO user_collection (
        user_id, collection_id
      ) VALUES (?, ?) `,
      1, 1)
  }
  async populateTableCollectionCoin() {
    await this.db.run(`INSERT INTO collection_coin (
        collection_id, coin_id
      ) VALUES (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)`,
      1, 1,
      1, 2,
      1, 3,
      1, 4,
      1, 5,
      1, 6)
  }
  async populateTableListing() {
    await this.db.run(`INSERT INTO listing(
        name, description, asking_price, trade, listed_coin, traded_coin
      ) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)`,
      "Um centavo", "um centavo", '100', false, 1, null,
      "Cinco Centavos por Dez centavos", "Sim, isso mesmo", null, true, 2, 3,
      "Vinte e Cinco Centavos", "vinte e cinco centavos", '100', false, 4, null,
      "Um real por Cinquenta Centavos", "um real", null, true, 5, 6
    )
  }
  async populateTableTransaction() {
    await this.db.run(`INSERT INTO 'transaction'(
        date, payment_method, listing_id
      ) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?)`,
      "2022-05-29T21:00:50.525Z", "credit_card", 1,
      "2022-05-29T21:00:50.525Z", null, 2,
      "2022-05-29T21:00:50.525Z", "credit_card", 3,
      "2022-05-29T21:00:50.525Z", null, 4,
    )
  }

  async dropTableUserCollection() {
    await this.db.run("DROP TABLE user_collection;")
  }
  async dropTableCollectionCoin() {
    await this.db.run("DROP TABLE collection_coin;")
  }
  async dropTableAuthorizationToken() {
    await this.db.run("DROP TABLE authorization_token;")
  }
  async dropTableCoin() {
    await this.db.run("DROP TABLE coin;")
  }
  async dropTableCollection() {
    await this.db.run("DROP TABLE collection;")
  }
  async dropTableListing() {
    await this.db.run("DROP TABLE listing;")
  }
  async dropTableUser() {
    await this.db.run("DROP TABLE user;")
  }
  async dropTableTransaction() {
    await this.db.run("DROP TABLE 'transaction';")
  }
}
