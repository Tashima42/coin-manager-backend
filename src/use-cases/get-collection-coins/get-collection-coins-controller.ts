import {Request, Response} from "express";
import {GetCollectionCoinsUseCase} from "./get-collection-coins-use-case"
import {IGetCollectionCoinsResponseDTO} from "./get-collection-coins-response-DTO";

export class GetCollectionCoinsController {
  constructor(private getCollectionCoinsUseCase: GetCollectionCoinsUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    try {
      const {id} = request.params
      const responseDTO: IGetCollectionCoinsResponseDTO = await this.getCollectionCoinsUseCase.execute(parseInt(id))

      return response.status(200).json(responseDTO)
    }
    catch (error: any) {
      console.error(error)
      return response.status(500).json({success: false, message: error.message, stack: error.stack})
    }
  }
}
