import {Transaction} from "../../entities/Transaction";

export interface IGetTransactionsResponseDTO {
  transactions: Array<Transaction>,
}
