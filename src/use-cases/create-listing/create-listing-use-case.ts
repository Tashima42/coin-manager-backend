import {IListingRepository} from "../../repositories/IListingRepository"
import {Listing} from "../../entities/Listing"
import {ICoinRepository} from "../../repositories/ICoinRepository"

export class CreateListingUseCase {
  constructor(
    private listingRepository: IListingRepository,
    private coinRepository: ICoinRepository
  ) {}

  async execute(askingPrice: string, name: string, description: string, trade: boolean, listedCoinId: number): Promise<void> {
    const listedCoin = await this.coinRepository.findById(listedCoinId)
    const listing = new Listing(askingPrice, name, description, true, trade, listedCoin)
    await this.listingRepository.create(listing)
    return
  }
}
