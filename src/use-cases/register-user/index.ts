import {AuthenticateUserUseCase} from "./register-user-use-case";
import {AuthenticateUserController} from "./register-user-controller";
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
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, authorizationCodeRepository, cryptoHelper)

// Instantiate Controller
const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase)

export {authenticateUserController}
