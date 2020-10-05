export class User {
  public readonly id: string
  public readonly name: string
  public readonly price: number

  public constructor(id: string, name: string, price: number) {
    this.id = id
    this.name = name
    this.price = price
  }
}
