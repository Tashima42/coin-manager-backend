import {IGetCoinsResponseDTO} from "./get-coins-response-DTO"
import {Coin} from "../../entities/Coin"
import {ICoinRepository} from "../../repositories/ICoinRepository"

export class GetCoinsUseCase {
  constructor(
    private coinRepository: ICoinRepository
  ) {}

  async execute(): Promise<IGetCoinsResponseDTO> {
    const coins: Array<Coin> = await this.coinRepository.findAll()
    return {coins}
  }
}
