import {ITransactionRepository} from "../../repositories/ITransactionRepository"
import {IGetTransactionByListingIdResponseDTO} from "./get-transaction-by-listing-id-response-DTO"

export class GetTransactionByListingIdUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(listing_id: number): Promise<IGetTransactionByListingIdResponseDTO> {
    const transaction = await this.transactionRepository.getByListingId(listing_id)
    return {transaction}
  }
}
