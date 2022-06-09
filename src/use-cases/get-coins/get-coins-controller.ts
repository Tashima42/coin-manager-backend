import {Request, Response} from "express";
import {GetCoinsUseCase} from "./get-coins-use-case"
import {IGetCoinsResponseDTO} from "./get-coins-response-DTO";

export class GetCoinsController {
  constructor(private getCoinsUseCase: GetCoinsUseCase) {}

  async handle(_: Request, response: Response): Promise<unknown> {
    try {
      const responseDTO: IGetCoinsResponseDTO = await this.getCoinsUseCase.execute()

      return response.status(200).json(responseDTO)
    }
    catch (error: any) {
      console.error(error)
      return response.status(500).json({success: false, message: error.message, stack: error.stack})
    }
  }
}
