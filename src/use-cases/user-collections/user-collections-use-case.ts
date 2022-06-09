import {ICollectionRepository} from "../../repositories/ICollectionRepository"
import {IUserCollectionsResponseDTO} from "./user-collections-response-DTO"
import {User} from "../../entities/User"

export class UserCollectionsUseCase {
  constructor(
    private collectionRepository: ICollectionRepository
  ) {}

  async execute(user: User): Promise<IUserCollectionsResponseDTO> {
    const userId = user.getId()
    const collections = await this.collectionRepository.findByUserId(userId)
    return {collections}
  }
}
