import IEventMessageUseCase from '@/usecases/line/webhook/eventMessage/interface'
import Spreadsheet from '@/usecases/spreadsheet'
import { getJamesWink } from '@/domains/line/emoji'
import {
  generateTextMessage,
  generateFlexMessage,
} from '@/domains/line/message'
import { getTempReportMessageContents } from '@/domains/line/flexMessage'
import { generateWomenPrice, generateMenPrice } from '@/domains/user'
import { getProperty } from '@/utils/gas'
import { Message } from '@/@types/line/message'
import { TextEventMessage } from '@/@types/line/webhook'

export default class TextEventMessageUseCase implements IEventMessageUseCase {
  public readonly eventMessage: TextEventMessage

  constructor(eventMessage: TextEventMessage) {
    this.eventMessage = eventMessage
  }

  public getMessages(): Message[] {
    const messages: Message[] = []
    switch (this.eventMessage.text) {
      case 'レポート':
        const sheet = new Spreadsheet()
        const prices = sheet.calcMonthlyPayment(new Date())
        const contents = getTempReportMessageContents(
          generateWomenPrice(prices.women),
          generateMenPrice(prices.men),
        )
        messages.push(
          generateFlexMessage('今月は下記金額を払っているよ！', contents),
        )
        break

      default:
        const text =
          'フォームから支出を登録してね$ \n' + getProperty('FORM_URL')
        messages.push(
          generateTextMessage(text, getJamesWink(text.indexOf('$'))),
        )
        break
    }
    return messages
  }
}
