export class Payment {
  public readonly id: string
  public readonly name: string
  public readonly date: Date
  public readonly price: number
  public readonly category: string
  public readonly memo: string

  public constructor(
    id: string,
    name: string,
    date: string,
    price: string,
    category: string,
    memo: string,
  ) {
    this.id = id
    this.name = name
    this.date = new Date(date)
    this.price = parseInt(price)
    this.category = category
    this.memo = memo
  }
}

export const PaymentBusinessRule = {
  isIdRequiredValid(id: string): boolean {
    return id !== ''
  },
  isNameRequiredValid(name: string): boolean {
    return name !== ''
  },
  isDateRequiredValid(date: string): boolean {
    return date !== ''
  },
  isPriceRequiredValid(price: string): boolean {
    return price !== ''
  },
  isCategoryRequiredValid(category: string): boolean {
    return category !== ''
  },
}
