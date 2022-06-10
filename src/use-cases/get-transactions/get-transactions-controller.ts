import {Request, Response} from "express";
import {GetTransactionsUseCase} from "./get-transactions-use-case"
import {IGetTransactionsResponseDTO} from "./get-transactions-response-DTO"

export class GetTransactionsController {
  constructor(private getTransactionsUseCase: GetTransactionsUseCase) {}

  async handle(_: Request, response: Response): Promise<unknown> {
    try {
      const transactions: IGetTransactionsResponseDTO = await this.getTransactionsUseCase.execute()

      return response.status(200).json(transactions)
    }
    catch (error: any) {
      console.error(error)
      return response.status(500).json({success: false, message: error.message, stack: error.stack})
    }
  }
}
