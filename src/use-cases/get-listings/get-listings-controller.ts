import {Request, Response} from "express";
import {GetListingsUseCase} from "./get-listings-use-case"
import {IGetListingsResponseDTO} from "./get-listings-response-DTO";

export class GetListingsController {
  constructor(private getListingsUseCase: GetListingsUseCase) {}

  async handle(_: Request, response: Response): Promise<unknown> {
    try {
      const responseDTO: IGetListingsResponseDTO = await this.getListingsUseCase.execute()

      return response.status(200).json(responseDTO)
    }
    catch (error: any) {
      console.error(error)
      return response.status(500).json({success: false, message: error.message, stack: error.stack})
    }
  }
}
