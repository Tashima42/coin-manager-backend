import {RegisterUserUseCase} from "./register-user-use-case";
import {RegisterUserController} from "./register-user-controller";
import {CryptoHelper} from "../../helpers/implementations/CryptoHelper";
import {SqliteAuthorizationTokenRepository} from "../../repositories/implementations/Sqlite/SqliteAuthorizationTokenRepository";
import {SqliteUserRepository} from "../../repositories/implementations/Sqlite/SqliteUserRepository";
import {sqliteDatabase} from "../../index"

// Instantiate helpers
const cryptoHelper = new CryptoHelper()
// Instantiate repositories
const authorizationCodeRepository = new SqliteAuthorizationTokenRepository(sqliteDatabase)
const userRepository = new SqliteUserRepository(sqliteDatabase)

// Instantiate Use Case
const registerUserUseCase = new RegisterUserUseCase(userRepository, authorizationCodeRepository, cryptoHelper)

// Instantiate Controller
const registerUserController = new RegisterUserController(registerUserUseCase)

export {registerUserController}
