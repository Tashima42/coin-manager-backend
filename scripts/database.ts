import {SqliteDatabase} from "../src/repositories/implementations/Sqlite/index"

run()

async function run() {
  const args: Array<string> = process.argv.slice(2)


  const sqliteDatabase = new SqliteDatabase()
  await sqliteDatabase.connect()
  for (const arg of args) {
    if (arg === '--migrate') await sqliteDatabase.migrate()
    if (arg === '--populate') await sqliteDatabase.populate()
    if (arg === '--drop-all') await sqliteDatabase.dropAll()
    if (arg === '--populate-coins') await sqliteDatabase.populateTableCoinGeneratedData()
  }
}


