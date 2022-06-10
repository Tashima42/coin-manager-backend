import {ICollectionRepository} from "../../repositories/ICollectionRepository"
import {Collection} from "../../entities/Collection"

export class CreateCollectionUseCase {
  constructor(private collectionRepository: ICollectionRepository) {}

  async execute(name: string, description: string, userId: number): Promise<void> {
    const collection = new Collection(name, description)
    await this.collectionRepository.create(collection, userId)
    return
  }
}
