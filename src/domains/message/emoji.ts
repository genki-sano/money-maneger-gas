export class Emoji {
  public readonly index: number
  public readonly productId: string
  public readonly emojiId: string

  public constructor(index: number, productId: string, emojiId: string) {
    this.index = index
    this.productId = productId
    this.emojiId = emojiId
  }
}
