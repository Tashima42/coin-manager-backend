import { Coin } from "./Coin";

export class Listing {
  private askingPrice: string;
  private name: string;
  private description: string;
  private advertisedCoin: Coin;
  private tradedCoin: Coin;

  constructor(askingPrice: string, name: string, description: string, advertisedCoin?: Coin, tradedCoin?: Coin) {
    this.askingPrice = this.askingPrice;
    this.name = name;
    this.description = description;
    this.advertisedCoin = advertisedCoin;
    this.tradedCoin = tradedCoin;
  }
}
