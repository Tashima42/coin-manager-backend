import {ICollectionRepository} from "../../repositories/ICollectionRepository"
import {User} from "../../entities/User"

export class UserCollectionsUseCase {
  constructor(
    private collectionRepository: ICollectionRepository
  ) {}

  async execute(user: User): Promise<string> {
    const userId = user.getId()
    const collections = await this.collectionRepository.findByUserId(userId)
    return collections
  }
}
