import {Coin} from "../entities/Coin"

export interface ICoinRepository {
  findAll(): Promise<Array<Coin>>
}
