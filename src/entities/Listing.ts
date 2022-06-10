import {Coin} from "./Coin";

export class Listing {
  private askingPrice: string;
  private name: string;
  private description: string;
  private enabled: boolean;
  private trade: boolean;
  private listedCoin: Coin;
  private tradedCoin: Coin;
  private id: number;

  constructor(askingPrice: string, name: string, description: string, enabled: boolean, trade: boolean, listedCoin?: Coin, tradedCoin?: Coin, id?: number) {
    this.askingPrice = askingPrice;
    this.name = name;
    this.description = description;
    this.enabled = enabled;
    this.trade = trade;
    this.listedCoin = listedCoin;
    this.tradedCoin = tradedCoin;
    this.id = id
  }

  getAskingPrice(): string {
    return this.askingPrice;
  }
  getName(): string {
    return this.name;
  }
  getDescription(): string {
    return this.description;
  }
  getListedCoin(): Coin {
    return this.listedCoin;
  }
  getTradedCoin(): Coin {
    return this.tradedCoin;
  }
  getEnabled(): boolean {
    return this.enabled;
  }
  getTrade(): boolean {
    return this.trade;
  }
  getId(): number {
    return this.id;
  }
}
