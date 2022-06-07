export class Coin {
  private name: string;
  private price: string;
  private image: string;
  private year: number;
  private id: number;

  constructor(name: string, price: string, image: string, year: number, id?: number) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.year = year;
    this.id = id;
  }

  getName(): string {
    return this.name;
  }
  getPrice(): string {
    return this.price;
  }
  getDescription(): string {
    return this.image;
  }
  getYear(): number {
 	return this.year;
  }
  getId(): number {
	  return this.id;
  }
}
