import {Request, Response} from "express";
import {AddCoinToCollectionUseCase} from "./add-coin-to-collection-use-case"

export class AddCoinToCollectionController {
  constructor(private addCoinToCollectionUseCase: AddCoinToCollectionUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    try {
      const {collection_id, coin_id} = request.params
      await this.addCoinToCollectionUseCase.execute(parseInt(collection_id), parseInt(coin_id))

      return response.status(200).json({success: true})
    }
    catch (error: any) {
      console.error(error)
      return response.status(500).json({success: false, message: error.message, stack: error.stack})
    }
  }
}
