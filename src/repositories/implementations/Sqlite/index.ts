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

  async populateTableCoinGeneratedData() {
    await this.db.run(`INSERT INTO coin (name, image, price, year) VALUES
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?),
(?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)`,
      'Tokyo Paralympic Games 2020', 'https://www.coin-database.com/images/Japan/4791.jpg', '1000', 2016,
      'Wrestling', 'https://www.coin-database.com/images/Japan/5971.jpg', '1000', 2020,
      'Football', 'https://www.coin-database.com/images/Japan/6091.jpg', '100', 2020,
      'Miraitowa', 'https://www.coin-database.com/images/Japan/6094.jpg', '100', 2020,
      'Baseball and Softball', 'https://www.coin-database.com/images/Japan/6098.jpg', '1000', 2020,
      'Skateboarding', 'https://www.coin-database.com/images/Japan/6101.jpg', '100', 2020,
      'Wind god', 'https://www.coin-database.com/images/Japan/6104.jpg', '500', 2020,
      'Olympic Games in Tokyo', 'https://www.coin-database.com/images/Portugal/5912.jpg', '8', 2021,
      'Fifth Enlargement of the European Union in 2004', 'https://www.coin-database.com/images/Greece/1.jpg', '2', 2004,
      '75th Anniversary of the Foundation of the Vatican City State', 'https://www.coin-database.com/images/San-Marino/233.jpg', '2', 2004,
      'Belgium-Luxembourg Economic Union', 'https://www.coin-database.com/images/Luxembourg/235.jpg', '2', 2005,
      'World Year of Physics 2005', 'https://www.coin-database.com/images/Austria/238.jpg', '2', 2005,
      '20th World Youth Day, held in Cologne in August 2005', 'https://www.coin-database.com/images/Italy/241.jpg', '2', 2005,
      'Holstentor in Lübeck (Schleswig-Holstein)', 'https://www.coin-database.com/images/Luxembourg/244.jpg', '2', 2006,
      '500th Anniversary of the Death of Christopher Columbus', 'https://www.coin-database.com/images/Finland/247.jpg', '2', 2006,
      'Grand Ducal Palace', 'https://www.coin-database.com/images/Germany/250.jpg', '2', 2007,
      '25th Anniversary of the Death of Grace Kelly', 'https://www.coin-database.com/images/Portugal/253.jpg', '2', 2007,
      '90th Anniversary of Finland\'s Independence', 'https://www.coin-database.com/images/San-Marino/255.jpg', '2', 2007,
      '60th Anniversary of the Universal Declaration of Human Rights', 'https://www.coin-database.com/images/Luxembourg/259.jpg', '2', 2008,
      '60th anniversary of the Universal Declaration of Human Rights', 'https://www.coin-database.com/images/San-Marino/262.jpg', '2', 2008,
      '60th Anniversary of the Universal Declaration of Human Rights', 'https://www.coin-database.com/images/Vatican-City/265.jpg', '2', 2008,
      '90th Anniversary of Grand Duchess Charlotte\'s Accession to the Throne', 'https://www.coin-database.com/images/Eurozone/268.jpg', '2', 2009,
      'European Year of Creativity and Innovation', 'https://www.coin-database.com/images/Portugal/271.jpg', '2', 2009,
      '200th Anniversary of birth of Louis Braille', 'https://www.coin-database.com/images/Vatican-City/275.jpg', '2', 2009,
      '70th Anniversary of the Appeal of June 18 by General de Gaulle', 'https://www.coin-database.com/images/Slovakia/276.jpg', '2', 2010,
      '150th anniversary of Finnish currency', 'https://www.coin-database.com/images/Greece/288.jpg', '2', 2010,
      'Coat of arms of the Grand Duke ', 'https://www.coin-database.com/images/Spain/281.jpg', '2', 2010,
      'Belgian Presidency of the Council of the European Union in 2010 ', 'https://www.coin-database.com/images/Slovenia/279.jpg', '2', 2010,
      '20th anniversary of the formation of the Visegrad Group ', 'https://www.coin-database.com/images/San-Marino/287.jpg', '2', 2011,
      '50th anniversary of the appointment by the Grand-Duchess Charlotte of her son Jean as lieutenant-représentant', 'https://www.coin-database.com/images/Germany/290.jpg', '2', 2011,
      '150th anniversary of unification of Italy ', 'https://www.coin-database.com/images/Slovenia/292.jpg', '2', 2011,
      '500th Anniversary of the birth of Giorgio Vasari', 'https://www.coin-database.com/images/Greece/303.jpg', '2', 2011,
      '500th annivesary of the birth of Fernão Mendes Pinto', 'https://www.coin-database.com/images/Monaco/302.jpg', '2', 2011,
      'XXVI World Youth Day Madrid 2011', 'https://www.coin-database.com/images/Finland/305.jpg', '2', 2011,
      '7th  World Meeting of Families ', 'https://www.coin-database.com/images/France/1806.jpg', '2', 2012,
      'Bavaria ', 'https://www.coin-database.com/images/Eurozone/988.jpg', '2', 2012,
      '100th Anniversary of the Death of Giovanni Pascoli', 'https://www.coin-database.com/images/Spain/1589.jpg', '2', 2012,
      'The 500th anniversary of the foundation of Monaco\'s Sovereignty', 'https://www.coin-database.com/images/Portugal/309.jpg', '2', 2012,
      'Príchod byzantskej misie sv. Cyrila a sv. Metoda na Veľkú Moravu - 1150. výročie', 'https://www.coin-database.com/images/Finland/2982.jpg', '2', 2013,
      '700th Anniversary of the Birth of Giovanni Boccaccio', 'https://www.coin-database.com/images/France/3217.jpg', '2', 2013,
      '100th Anniversary of the union of Crete with Greece', 'https://www.coin-database.com/images/Vatican-City/3228.jpg', '2', 2013,
      '50 Years of the Élysée Treaty', 'https://www.coin-database.com/images/Germany/2879.jpg', '2', 2013,
      'The Double Portrait', 'https://www.coin-database.com/images/Slovenia/2324.jpg', '2', 2013,
      'Sede Vacante MMXIII', 'https://www.coin-database.com/images/Portugal/3002.jpg', '2', 2013,
      'The National Anthem', 'https://www.coin-database.com/images/Belgium/3046.jpg', '2', 2013,
      '125th Anniversary of the birth of Nobel prize winning author F.E.Sillanpaa', 'https://www.coin-database.com/images/Finland/3373.jpg', '2', 2013,
      '450th Anniversary of the birth of Galileo Galilei', 'https://www.coin-database.com/images/Malta/316.jpg', '2', 2014,
      'Works of Antoni Gaudí', 'https://www.coin-database.com/images/Luxembourg/3475.jpg', '2', 2014,
      'Riga', 'https://www.coin-database.com/images/Malta/3544.jpg', '2', 2014,
      '10 Years of Slovakian Membership in European Union', 'https://www.coin-database.com/img/2euro/2014de.jpg', '2', 2014,
      'The Double Portrait 2014', 'https://www.coin-database.com/images/France/3360.jpg', '2', 2014,
      '150th Anniversary of the Union of the Ionian Islands with Greece', 'https://www.coin-database.com/images/Greece/3592.jpg', '2', 2014,
      '150 Years of Red Cross in Belgium', 'https://www.coin-database.com/images/San-Marino/3541.jpg', '2', 2014,
      '50th Anniversary of the Accession to the Throne of Grand Duke Jean', 'https://www.coin-database.com/images/Slovenia/3293.jpg', '2', 2014,
      'World AIDS Day 2014', 'https://www.coin-database.com/images/Finland/3645.jpg', '2', 2014,
      '2000th Anniversary of the Founding of Emona', 'https://www.coin-database.com/images/Malta/3047.jpg', '2', 2015,
      'Cave of Altamira', 'https://www.coin-database.com/images/Vatican-City/3902.jpg', '2', 2015,
      '500 Years of Portugiesisch-Timor', 'https://www.coin-database.com/images/San-Marino/3907.jpg', '2', 2015,
      'EXPO Milan 2015', 'https://www.coin-database.com/images/Latvia/3926.jpg', '2', 2015,
      '150 Years of Red Cross in Portugal', 'https://www.coin-database.com/images/Malta/3961.jpg', '2', 2015,
      '150th Anniversary of the Birth of Akseli Gallen-Kallela', 'https://www.coin-database.com/images/Eurozone/4077.jpg', '2', 2015,
      '125th anniversary of the House of Nassau-Weilburg', 'https://www.coin-database.com/images/Lithuania/4174.jpg', '2', 2015,
      '25th anniversary of the Signature of the Customs Agreement with the European Union ', 'https://www.coin-database.com/images/Andorra/4353.jpg', '2', 2015,
      '25th anniversary of German reunification', 'https://www.coin-database.com/images/Finland/3953.jpg', '2', 2015,
      '75th Anniversary of the Death of Spyridon Louis', 'https://www.coin-database.com/images/Slovakia/3967.jpg', '2', 2015,
      '200 Years of the Österreichische Nationalbank', 'https://www.coin-database.com/images/Ireland/3599.jpg', '2', 2016,
      'Old Town of Segovia and its Aqueduct', 'https://www.coin-database.com/images/Slovenia/4095.jpg', '2', 2016,
      'The Baltic Culture', 'https://www.coin-database.com/images/France/4129.jpg', '2', 2016,
      'Jubilee of Mercy', 'https://www.coin-database.com/images/Vatican-City/4198.jpg', '2', 2016,
      'Child Focus', 'https://www.coin-database.com/images/Latvia/4209.jpg', '2', 2016,
      '2200th Anniversary of the Death of Tito Maccio Plauto', 'https://www.coin-database.com/images/Italy/4243.jpg', '2', 2016,
      'Ġgantija Temples ', 'https://www.coin-database.com/images/Andorra/4346.jpg', '2', 2016,
      '2016 UEFA European Championship ', 'https://www.coin-database.com/images/Monaco/4349.jpg', '2', 2016,
      '500th Anniversary of the Death of Donatello', 'https://www.coin-database.com/images/Belgium/4101.jpg', '2', 2016,
      '150 years from the Arkadi Monastery Torching ', 'https://www.coin-database.com/images/Latvia/4292.jpg', '2', 2016,
      'Rheinland-Pfalz: Porta Nigra', 'https://www.coin-database.com/images/Finland/4270.jpg', '2', 2017,
      'The events that preceded Estonia’s independence', 'https://www.coin-database.com/images/Lithuania/4167.jpg', '2', 2017,
      '200 Years Liege University ', 'https://www.coin-database.com/images/France/4352.jpg', '2', 2017,
      'UNESCO Maltese prehistoric temples of Hagar Qim', 'https://www.coin-database.com/images/Belgium/4388.jpg', '2', 2017,
      'International Year of Sustainable Tourism for Development', 'https://www.coin-database.com/images/Vatican-City/4429.jpg', '2', 2017,
      'Death of Titus Livius 2000 Years', 'https://www.coin-database.com/images/Italy/4434.jpg', '2', 2017,
      'Fight against breast cancer ', 'https://www.coin-database.com/images/San-Marino/4520.jpg', '2', 2017,
      '550th anniversary of the establishment of Academia Istropolitana', 'https://www.coin-database.com/images/Monaco/5349.jpg', '2', 2017,
      '60 years in memoriam of Nikos Kazantzakis', 'https://www.coin-database.com/images/Finland/4282.jpg', '2', 2017,
      'Kurzeme', 'https://www.coin-database.com/images/Finland/4380.jpg', '2', 2017,
      '100 years of the Andorra Anthem', 'https://www.coin-database.com/images/Portugal/4878.jpg', '2', 2017,
      '100. Geburtstag von Helmut Schmidt', 'https://www.coin-database.com/images/Germany/3457.jpg', '2', 2018,
      '250th Anniversary Of The National Printing Office', 'https://www.coin-database.com/images/Spain/4490.jpg', '2', 2018,
      'European Year of Cultural Heritage', 'https://www.coin-database.com/images/Slovenia/5134.jpg', '2', 2018,
      '500th Anniversary of the Birth of Tintoretto', 'https://www.coin-database.com/images/Lithuania/5151.jpg', '2', 2018,
      'Koli National Park', 'https://www.coin-database.com/images/Greece/5202.jpg', '2', 2018,
      '70 years of the Universal Declaration of Human Rights', 'https://www.coin-database.com/images/Monaco/5248.jpg', '2', 2018,
      '50th Anniversary of the death of Padre Pio', 'https://www.coin-database.com/images/Luxembourg/5534.jpg', '2', 2018,
      'The Centenary of the Founding of the Republic of Austria', 'https://www.coin-database.com/images/Italy/5066.jpg', '2', 2018,
      '100th Anniversary of the Baltic States', 'https://www.coin-database.com/images/Spain/4491.jpg', '2', 2018,
      '60 Years of the Ministry of Health', 'https://www.coin-database.com/images/Estonia/5176.jpg', '2', 2018,
      'Mnajdra Temples', 'https://www.coin-database.com/images/France/5443.jpg', '2', 2018,
      'Zemgale', 'https://www.coin-database.com/images/San-Marino/5194.jpg', '2', 2018,
      '100th Anniversary of the first sitting of Dáil Éireann', 'https://www.coin-database.com/images/Estonia/5177.jpg', '2', 2019,
      'Walls of Ávila', 'https://www.coin-database.com/images/San-Marino/5544.jpg', '2', 2019,
      '150th Anniversary ot the Death of Andreas Kalvos', 'https://www.coin-database.com/images/Greece/5664.jpg', '2', 2019,
      '25th anniversary of the restoration of the Sistine Chapel', 'https://www.coin-database.com/images/Malta/5690.jpg', '2', 2019,
      'Samogitia', 'https://www.coin-database.com/images/Lithuania/5706.jpg', '2', 2019,
      '200th Anniversary of the Accession to the Throne Prince Honoré V.', 'https://www.coin-database.com/images/Andorra/5803.jpg', '2', 2019,
      'Bun­des­rat', 'https://www.coin-database.com/images/Belgium/5637.jpg', '2', 2019,
      '60 Years of Asterix ', 'https://www.coin-database.com/images/Portugal/5458.jpg', '2', 2019,
      'Solidarity children - Nature', 'https://www.coin-database.com/images/Latvia/5978.jpg', '2', 2019,
      '30 Years of Fall of the Berlin Wall', 'https://www.coin-database.com/images/Finland/5967.jpg', '2', 2019,
      '100th Anniversary of the University of Ljubljana', 'https://www.coin-database.com/images/Estonia/5899.jpg', '2', 2019,
      'Centenary of the Tartu Peace Treaty', 'https://www.coin-database.com/images/Germany/4153.jpg', '2', 2020,
      '500th Anniversary of the Birth of Adam Bohorič', 'https://www.coin-database.com/images/Lithuania/5709.jpg', '2', 2020,
      '75 years United Nations', 'https://www.coin-database.com/images/Luxembourg/5907.jpg', '2', 2020,
      'International Year of Plant Health', 'https://www.coin-database.com/images/Belgium/5947.jpg', '2', 2020,
      'The Vigili del Fuoco - National Firefighters Corps', 'https://www.coin-database.com/images/Latvia/6008.jpg', '2', 2020,
      '100th Anniversary of the Bitrh of John Paul II', 'https://www.coin-database.com/images/Greece/6026.jpg', '2', 2020,
      'XXVII. Ibero-American Summit 2020 Andorra', 'https://www.coin-database.com/images/Greece/6163.jpg', '2', 2020,
      '100th Anniversary of the Birth of Väinö Linna', 'https://www.coin-database.com/images/Finland/6268.jpg', '2', 2020,
      '200th Anniversary of the First Antarctic Expedition', 'https://www.coin-database.com/images/Monaco/6384.jpg', '2', 2020,
      '250th Anniversary of the Giovanni Battista Tiepolo', 'https://www.coin-database.com/images/Italy/6009.jpg', '2', 2020,
      'Birth of Prince Charles', 'https://www.coin-database.com/images/Portugal/6287.jpg', '2', 2020,
      'The Summer Olympic Games 2021', 'https://www.coin-database.com/images/Germany/5852.jpg', '2', 2021,
      '200th Anniversary of the Establishment of the Carniola Provincial Museum', 'https://www.coin-database.com/images/Luxembourg/6132.jpg', '2', 2021,
      'Žuvintas Biosphere Reserve', 'https://www.coin-database.com/images/Lithuania/6279.jpg', '2', 2021,
      '500 Years of Carolus V', 'https://www.coin-database.com/images/San-Marino/6328.jpg', '2', 2021,
      'Rome - The Capital City', 'https://www.coin-database.com/images/Vatican-City/6406.jpg', '2', 2021,
      '75 Years of UNICEF', 'https://www.coin-database.com/images/Finland/6482.jpg', '2', 2021,
      '100th Anniversary of the Coronation of Our Lady of Meritxell', 'https://www.coin-database.com/images/Belgium/6510.jpg', '2', 2021,
      '100th anniversary of de iure recognition of Latvia', 'https://www.coin-database.com/images/Monaco/6657.jpg', '2', 2021,
      'Journalism and free press supporting Finnish democracy', 'https://www.coin-database.com/images/San-Marino/6329.jpg', '2', 2021,
      'Olympic Games Paris 2024', 'https://www.coin-database.com/images/Malta/6654.jpg', '2', 2021,
      'Thüringen - Wartburg Castle in Eisenach', 'https://www.coin-database.com/images/Slovakia/6066.jpg', '2', 2022,
      '100 years of basketball in Lithuania', 'https://www.coin-database.com/images/Estonia/6443.jpg', '2', 2022,
      '35th Anniversary of the Erasmus Programme', 'https://www.coin-database.com/images/Spain/6561.jpg', '2', 2022,
      '30th Anniversary of Death of Judges Giovanni Falcone and Paolo Borsellino', 'https://www.coin-database.com/images/Finland/6705.jpg', '2', 2022,
      'Financial Literacy', 'https://www.coin-database.com/images/Portugal/6719.jpg', '2', 2022,
      '200 Years from the First Greek Constitution', 'https://www.coin-database.com/images/France/6820.jpg', '2', 2022,
      'Presidency of the European Union ', 'https://www.coin-database.com/images/Italy/1175.jpg', '10', 2003,
      'XX. Olympic Winter Games 2006 in Turin - Alpine Skiing - Downhill skiing', 'https://www.coin-database.com/images/Italy/1178.jpg', '10', 2005,
      '60 years United Nations', 'https://www.coin-database.com/images/Italy/1181.jpg', '10', 2005,
      'Leonardo da Vinci', 'https://www.coin-database.com/images/Italy/1897.jpg', '10', 2006,
      '500. anniversary of the death of Andrea Mantegna', 'https://www.coin-database.com/images/Italy/1186.jpg', '10', 2006,
      '250. birthday of Antonio Canova', 'https://www.coin-database.com/images/Italy/1189.jpg', '10', 2007,
      'International Year of Astronomy', 'https://www.coin-database.com/images/Italy/1192.jpg', '10', 2009,
      '400th Anniversary of the death of Annibale Carracci', 'https://www.coin-database.com/images/Italy/1195.jpg', '10', 2009,
      '400th anniversary of the birth of  painter Caravaggio ', 'https://www.coin-database.com/images/Italy/1198.jpg', '10', 2010,
      'Alcide De Gasperi ', 'https://www.coin-database.com/images/Italy/1201.jpg', '10', 2011,
      'Michelangelo Buonarroti', 'https://www.coin-database.com/images/Italy/1204.jpg', '10', 2012,
      'Luigi Pirandello', 'https://www.coin-database.com/images/Italy/2379.jpg', '10', 2013,
      '2000th Anniversary of the Roman Emperor Augustus', 'https://www.coin-database.com/images/Italy/3528.jpg', '10', 2014,
      '70 Years of United Nations', 'https://www.coin-database.com/images/Italy/3531.jpg', '10', 2015,
      'Sardinia', 'https://www.coin-database.com/images/Italy/4249.jpg', '10', 2016,
      'Trani Cathedral – Apulia', 'https://www.coin-database.com/images/Italy/4445.jpg', '10', 2018,
      'The Baroque', 'https://www.coin-database.com/images/Italy/5123.jpg', '10', 2018)
  }
}
