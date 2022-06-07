import {Coin} from "./Coin";

export class Collection {
  private name: string;
  private description: string;
  private id: number;

  constructor(name: string, description: string, id?: number) {
    this.name = name;
    this.description = description;
    this.id = id;
  }

  getName(): string {
    return this.name;
  }
  getDescription(): string {
    return this.description;
  }
  getId(): number {
	  return this.id;
  }
}
