export class Payment {
  public readonly id: string
  public readonly url: string
  public readonly name: string
  public readonly data: Date
  public readonly price: number
  public readonly category: string
  public readonly memo: string

  public constructor(
    id: string,
    url: string,
    name: string,
    data: Date,
    price: number,
    category: string,
    memo: string,
  ) {
    this.id = id
    this.url = url
    this.name = name
    this.data = data
    this.price = price
    this.category = category
    this.memo = memo
  }
}
