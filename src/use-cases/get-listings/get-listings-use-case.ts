import {IListingRepository} from "../../repositories/IListingRepository"
import {IGetListingsResponseDTO} from "./get-listings-response-DTO"
import {Listing} from "../../entities/Listing"

export class GetListingsUseCase {
  constructor(
    private listingRepository: IListingRepository
  ) {}

  async execute(): Promise<IGetListingsResponseDTO> {
    const listings: Array<Listing> = await this.listingRepository.findAll()
    return {listings}
  }
}
