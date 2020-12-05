import { User } from '@/domains/user'

export class Diff {
  public readonly women: User
  public readonly men: User
  public static readonly to: string
  public static readonly from: string
  public static readonly price: number

  public constructor(women: User, men: User) {
    this.women = women
    this.men = men
  }

  public get to(): string {
    if (this.women.price < this.men.price) {
      return this.men.name
    }
    return this.women.name
  }

  public get from(): string {
    if (this.women.price < this.men.price) {
      return this.women.name
    }
    return this.men.name
  }

  public get price(): number {
    const diff = Math.abs(this.women.price - this.men.price)
    return Math.ceil(diff / 2)
  }
}
