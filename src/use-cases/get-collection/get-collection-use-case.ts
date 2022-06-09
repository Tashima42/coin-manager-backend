import {ICollectionRepository} from "../../repositories/ICollectionRepository"
import {IGetCollectionResponseDTO} from "./get-collection-response-DTO"

export class GetCollectionUseCase {
  constructor(
    private collectionRepository: ICollectionRepository
  ) {}

  async execute(id: number): Promise<IGetCollectionResponseDTO> {
    const collection = await this.collectionRepository.findById(id)
    return collection
  }
}
