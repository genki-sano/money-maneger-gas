import { Message } from '@/@types/line/message'
import { generateFlexMessage } from '@/domains/line/message'
import {
  getMonthlyMessageContents,
  getInsertMesaggeContents,
} from '@/domains/line/flexMessage'
import {
  generateDiff,
  generateWomenPrice,
  generateMenPrice,
  Prices,
} from '@/domains/user'
import { Record } from '@/domains/spreadsheet'

export const getMonthlyMessages = (prices: Prices): Message[] => {
  const content = getMonthlyMessageContents(
    generateDiff(prices),
    generateWomenPrice(prices.women),
    generateMenPrice(prices.men),
  )

  return [generateFlexMessage('先月の精算をしてね！', content)]
}

export const getInsertMesagges = (
  prices: Prices,
  record: Record,
  url: string,
): Message[] => {
  const content = getInsertMesaggeContents(
    record,
    url,
    generateWomenPrice(prices.women),
    generateMenPrice(prices.men),
  )

  return [generateFlexMessage('支払い登録が完了したよ！', content)]
}
