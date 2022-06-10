import {Request, Response} from "express";
import {CreateListingUseCase} from "./create-listing-use-case"

export class CreateListingController {
  constructor(private createListingUseCase: CreateListingUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    try {
      const {askingPrice, name, description, trade, listedCoinId} = request.body
      await this.createListingUseCase.execute(askingPrice, name, description, trade, listedCoinId)

      return response.status(200).json({success: true})
    }
    catch (error: any) {
      console.error(error)
      return response.status(500).json({success: false, message: error.message, stack: error.stack})
    }
  }
}
