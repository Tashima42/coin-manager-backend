import {User} from "../../entities/User"
import {IUserProfileResponseDTO} from "./user-profile-response-DTO"

export class UserProfileUseCase {
  async execute(user: User): Promise<IUserProfileResponseDTO> {
    return {name: user.getName(), username: user.getUsername(), id: user.getId()}
  }
}
