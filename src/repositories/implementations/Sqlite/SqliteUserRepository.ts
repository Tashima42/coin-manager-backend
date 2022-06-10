import {IUserRepository} from "../../IUserRepository";
import {User} from "../../../entities/User";
import {SqliteDatabase} from "./index";

export class SqliteUserRepository implements IUserRepository {
  constructor(private sqliteDatabase: SqliteDatabase) {}

  async create(user: User): Promise<User> {
    const created = await this.sqliteDatabase.db.run(`INSERT INTO user (username, name, password) VALUES (?, ?, ?);`,
      user.getUsername(), user.getName(), user.getPassword());
    user.setId(created.lastID);
    return user
  }
  async findByUsername(username: string): Promise<User> {
    const userFound = await this.sqliteDatabase.db.get(`SELECT * FROM user WHERE username = ?;`,
      username)
    if (!userFound) throw {code: "RS-IS-SE-UR-001", message: "User not found"}
    const user = new User(
      userFound.username,
      userFound.name,
      userFound.password,
      userFound.id,
    )
    return user
  }
}
