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
      listed_coin 'INTEGER' NOT NULL,
      traded_coin 'INTEGER',
      FOREIGN KEY (listed_coin) REFERENCES coin (id),
      FOREIGN KEY (traded_coin) REFERENCES coin (id))`)
    }
    async createTableTransaction(): Promise<void> {
      await this.db.exec(`CREATE TABLE IF NOT EXISTS 'transaction'(
      id 'INTEGER' PRIMARY KEY,
      date 'TEXT' NOT NULL,
      payment_form 'TEXT',
      listing_id 'INTEGER' NOT NULL,
      FOREIGN KEY (listing_id) REFERENCES listing (id))`)
    }
    async createTableAuthorizationToken(): Promise<void> {
      await this.db.exec(`CREATE TABLE IF NOT EXISTS authorization_token(
      id 'INTEGER' PRIMARY KEY,
      user_id 'INTEGER' NOT NULL,
      token 'TEXT' NOT NULL UNIQUE,
      valid 'BOOLEAN' DEFAULT "TRUE" NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user (id))`)
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
        name, price, image, year
      ) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)`,
        'Um Centavo', '0.01', '1 Centavo',
        'Cinco Centavos', '0.50', '5 Centavos',
        'Dez Centavos', '0.10', '10 Centavos',
        'Vinte e Cinco Centavos', '0.25', '25 Centavos',
        'Cinquenta Centavos', '0.50', '50 Centavos',
        'Um Real', '1.00', 'Moeda Brasileira',
      )
    }
    async populateTableCollection() {
      await this.db.run(`INSERT INTO collection (
        name
      ) VALUES (?) `,
        'Moedas Brasileiras')
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
        name, description, listed_coin, traded_coin
      ) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)`,
          "Um centavo", "um centavo", 1, null,
          "Cinco Centavos por Dez centavos", "Sim, isso mesmo", 2, 3,
          "Vinte e Cinco Centavos", "vinte e cinco centavos", 4, null,
          "Um real por Cinquenta Centavos", "um real", 5, 6,
                  )
    }
    async populateTableTransaction() {
      await this.db.run(`INSERT INTO 'transaction'(
        date, payment_form, listing_id
      ) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?)`,
          "2022-05-29T21:00:50.525Z", "credit_card", 1,
          "2022-05-29T21:00:50.525Z", null, 2,
          "2022-05-29T21:00:50.525Z", "credit_card", 3,
          "2022-05-29T21:00:50.525Z", null, 4,
                  )
    }
}
