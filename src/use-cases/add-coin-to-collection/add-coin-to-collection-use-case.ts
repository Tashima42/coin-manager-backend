import {ICoinRepository} from "../../repositories/ICoinRepository"

export class AddCoinToCollectionUseCase {
  constructor(
    private coinRepository: ICoinRepository
  ) {}

  async execute(collection_id: number, coin_id: number): Promise<void> {
    await this.coinRepository.addToCollection(collection_id, coin_id)
    return
  }
}
