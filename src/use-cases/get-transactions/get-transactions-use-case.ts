import {ITransactionRepository} from "../../repositories/ITransactionRepository"
import {IGetTransactionsResponseDTO} from "./get-transactions-response-DTO"

export class GetTransactionsUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(): Promise<IGetTransactionsResponseDTO> {
    const transactions = await this.transactionRepository.getAll()
    return {transactions}
  }
}
