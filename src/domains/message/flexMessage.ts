import { FlexContainer } from '@/@types/line/message'

export class FlexMessage {
  public readonly type: string
  public readonly altText: string
  public readonly contents: FlexContainer

  public constructor(altText: string, contents: FlexContainer) {
    this.type = 'text'
    this.altText = altText
    this.contents = contents
  }
}

export const FlexMessageBusinessRule = {
  isAltTextLengthValid(altText: string): boolean {
    return altText.length >= 0 && altText.length <= 400
  },
}
