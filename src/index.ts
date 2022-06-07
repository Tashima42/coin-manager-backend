import express, {Request, NextFunction, Response} from "express"
import cors from "cors"
import {SqliteDatabase} from "./repositories/implementations/Sqlite/index"
const sqliteDatabase = new SqliteDatabase()
export {sqliteDatabase}

import {router} from "./routes"

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(log)
app.use(router)

sqliteDatabase.connect().then(() => {
  app.listen(3890, () => console.info("app listening on port 3890"))
})

function log(req: Request, res: Response, next: NextFunction): unknown {
  console.log({
    query: req.query,
    body: req.body,
    url: req.url,
    headers: req.headers,
  })
  return next()
}
