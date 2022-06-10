import {ITransactionRepository} from "../../repositories/ITransactionRepository"
import {IListingRepository} from "../../repositories/IListingRepository"
import {IMakeTransactionRequestDTO} from "./make-transaction-request-DTO"

export class MakeTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository, private listingRepository: IListingRepository) {}

  async execute(data: IMakeTransactionRequestDTO): Promise<void> {
      const {listing_id, payment_method, traded_coin_id} = data
      if (traded_coin_id) {
        await this.listingRepository.setTradedCoin(listing_id, traded_coin_id)
      }
        await this.transactionRepository.create(new Date(), listing_id, payment_method)
    await this.listingRepository.disable(listing_id)
    return
  }
}
