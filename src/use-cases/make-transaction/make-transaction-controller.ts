import {Request, Response} from "express";
import {IMakeTransactionRequestDTO} from "./make-transaction-request-DTO";
import {MakeTransactionUseCase} from "./make-transaction-use-case"

export class MakeTransactionController {
  constructor(private makeTransactionUseCase: MakeTransactionUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    try {
      const {body} = request
      console.log(body)
      const makeTransactionRequestDTO: IMakeTransactionRequestDTO = {
        listing_id: parseInt(body.listing_id),
        payment_method: body?.payment_method,
        traded_coin_id: parseInt(body?.traded_coin_id),
      }
      await this.makeTransactionUseCase.execute(makeTransactionRequestDTO)


      return response.status(200).json({success: true})
    }
    catch (error: any) {
      console.error(error)
      return response.status(500).json({success: false, message: error.message, stack: error.stack})
    }
  }
}
