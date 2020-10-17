import { Emoji } from '@/domains/message/emoji'
import { toArray } from '@/utils'

export class TextMessage {
  public readonly type: string
  public readonly text: string
  public readonly emojis: Emoji[]

  public constructor(text: string, emojis: Emoji | Emoji[] = []) {
    this.type = 'text'
    this.text = text
    this.emojis = toArray(emojis)
  }
}

export const TextMessageBusinessRule = {
  isTextLengthValid(text: string): boolean {
    return text.length >= 0 && text.length <= 5000
  },
  isEmojisLengthValid(emojis: Emoji[]): boolean {
    return emojis.length >= 0 && emojis.length <= 20
  },
}
