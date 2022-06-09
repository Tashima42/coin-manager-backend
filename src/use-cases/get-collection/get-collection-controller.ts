import {Request, Response} from "express";
import {IGetCollectionResponseDTO} from "./get-collection-response-DTO";
import {GetCollectionUseCase} from "./get-collection-use-case";

export class GetCollectionController {
  constructor(private getCollectionUseCase: GetCollectionUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    try {
      const {id} = request.params
      const responseDTO: IGetCollectionResponseDTO = await this.getCollectionUseCase.execute(parseInt(id))

      return response.status(200).json(responseDTO)
    } catch (error: any) {
      console.error(error)
      return response.status(500).json({success: false, message: error.message, stack: error.stack})
    }
  }
}
