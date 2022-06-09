import {IGetCollectionCoinsResponseDTO} from "./get-collection-coins-response-DTO"
import {Coin} from "../../entities/Coin"
import {ICoinRepository} from "../../repositories/ICoinRepository"

export class GetCollectionCoinsUseCase {
  constructor(
    private coinRepository: ICoinRepository
  ) {}

  async execute(id: number): Promise<IGetCollectionCoinsResponseDTO> {
    const coins: Array<Coin> = await this.coinRepository.findByCollectionId(id)
    return {coins}
  }
}
