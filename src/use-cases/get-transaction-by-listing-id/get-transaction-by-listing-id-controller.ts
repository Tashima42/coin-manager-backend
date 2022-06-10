import {Request, Response} from "express";
import {GetTransactionByListingIdUseCase} from "./get-transaction-by-listing-id-use-case"
import {IGetTransactionByListingIdResponseDTO} from "./get-transaction-by-listing-id-response-DTO"

export class GetTransactionByListingIdController {
  constructor(private getTransactionByListingIdUseCase: GetTransactionByListingIdUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    try {
      const {listing_id} = request.params
      const transaction: IGetTransactionByListingIdResponseDTO = await this.getTransactionByListingIdUseCase.execute(parseInt(listing_id))

      return response.status(200).json(transaction)
    }
    catch (error: any) {
      console.error(error)
      return response.status(500).json({success: false, message: error.message, stack: error.stack})
    }
  }
}
