import express, {Request, NextFunction, Response} from "express"
import cors from "cors"
import {SqliteDatabase} from "./repositories/implementations/Sqlite/index"
const sqliteDatabase = new SqliteDatabase()
export {sqliteDatabase}

import {router} from "./routes"

const app = express()

const port = process.env.PORT || 3890

const corsOptions = {
  origin: ['http://localhost:3000', 'https://coin-manager-hokdxpnd4-tashima42.vercel.app'],
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(log)
app.use(router)

app.options("/user/authenticate", cors())

sqliteDatabase.connect().then(() => {
  app.listen(port, () => console.info("app listening on port " + port))
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
