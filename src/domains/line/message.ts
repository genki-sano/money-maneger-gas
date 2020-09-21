import { toArray } from '@/utils/common'
import {
  TextMessage,
  Emoji,
  FlexContainer,
  FlexMessage,
} from '@/@types/line/message'

export const generateTextMessage = (
  text: string,
  emojis: Emoji | Emoji[] = [],
): TextMessage => {
  return {
    type: 'text',
    text: text,
    emojis: toArray(emojis),
  }
}

export const generateEmoji = (
  index: number,
  productId: string,
  emojiId: string,
): Emoji => {
  return {
    index: index,
    productId: productId,
    emojiId: emojiId,
  }
}

export const generateFlexMessage = (
  altText: string,
  contents: FlexContainer,
): FlexMessage => {
  return {
    type: 'flex',
    altText: altText,
    contents: contents,
  }
}
