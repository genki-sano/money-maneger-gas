import Client from '@/interfaces/presenters/line/client'
import Froms from '@/usecases/forms'
import Spreadsheet from '@/usecases/spreadsheet'
import {
  getMonthlyMessages,
  getInsertMesagges,
} from '@/usecases/line/pushMessage'
import { getLastMonth } from '@/utils/date'
import { getProperty } from '@/utils/gas'

export default class PushMessageController {
  private readonly client: Client

  constructor(channelAccessToken: string) {
    this.client = new Client({
      channelAccessToken: channelAccessToken,
    })
  }

  public monthly(): void {
    const spredsheet = new Spreadsheet()

    const lastMonth = getLastMonth(new Date())
    const prices = spredsheet.calcMonthlyPayment(lastMonth)
    const messages = getMonthlyMessages(prices)

    this.client.sendPushMessage(getProperty('WOMEN_USER_ID'), messages)
    this.client.sendPushMessage(getProperty('MEN_USER_ID'), messages)
  }

  public insert(range: GoogleAppsScript.Spreadsheet.Range): void {
    const row = range.getRow()

    const froms = new Froms()
    const spredsheet = new Spreadsheet()

    const fromResponse = froms.getResponse()
    const editUrl = froms.getLastEditResponseUrl(fromResponse)
    const responseId = froms.getLastEditResponseId(fromResponse)

    spredsheet.setResponseId(row, responseId)
    spredsheet.setEdiableUrl(row, editUrl)
    spredsheet.setDate(row, new Date())

    const record = spredsheet.getRecordInRow(row)
    const prices = spredsheet.calcMonthlyPayment(new Date())
    const messages = getInsertMesagges(prices, record, editUrl)

    this.client.sendPushMessage(getProperty('WOMEN_USER_ID'), messages)
    this.client.sendPushMessage(getProperty('MEN_USER_ID'), messages)
  }
}
