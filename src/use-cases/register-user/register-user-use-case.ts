import {IRegisterUserRequestDTO} from "./register-user-request-DTO";
import {IAuthorizationTokenRepository} from "../../repositories/IAuthorizationTokenRepository";
import {IUserRepository} from "../../repositories/IUserRepository";
import {AuthorizationToken} from "../../entities/AuthorizationToken";
import {ICryptoHelper} from "../../helpers/ICryptoHelper";
import {User} from "../../entities/User";

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authorizationTokenRepository: IAuthorizationTokenRepository,
    private cryptoHelper: ICryptoHelper
  ) {}

  async execute(data: IRegisterUserRequestDTO): Promise<string> {
    const {name, username, password: plainPassword} = data

    try {
      await this.userRepository.findByUsername(username)
    } catch (error) {
      if (error.code !== "RS-IS-SE-UR-001") throw error
    }
    const hashedPassword = await this.cryptoHelper.hashBcrypt(plainPassword)

    const user = new User(username, name, hashedPassword)

    const createdUser = await this.userRepository.create(user)

    const authorizationCode = await this.generateAuthorizationToken(createdUser)

    return authorizationCode
  }

  private async generateAuthorizationToken(user: User): Promise<string> {
    const token = this.cryptoHelper.generateRandomHash()
    const authorizationToken = new AuthorizationToken(token, user)
    // Create authorizationToken
    const createdAuthorizationCode = await this.authorizationTokenRepository.create(authorizationToken)
    if (!createdAuthorizationCode) throw {code: "UC-AU-005", message: "Failed to create code"}
    return token
  }
}
