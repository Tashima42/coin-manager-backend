import {User} from "../../entities/User"

export class UserProfileUseCase {
  async execute(user: User): Promise<{username: string, id: number}> {
    return { username: user.getUsername(), id: user.getId() }
  }
}
