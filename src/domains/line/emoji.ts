import { generateEmoji } from '@/domains/line/message'
import { Emoji } from '@/@types/line/message'

export const getConyCry = (index: number): Emoji => {
  return generateEmoji(index, '5ac1bfd5040ab15980c9b435', '046')
}

export const getJamesWink = (index: number): Emoji => {
  return generateEmoji(index, '5ac1bfd5040ab15980c9b435', '098')
}
