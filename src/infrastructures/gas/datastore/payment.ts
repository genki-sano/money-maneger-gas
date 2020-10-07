import { PaymentDataStructure } from '@/applications/repositories/payment'
import { IPaymentDataStore } from '@/infrastructures/datastore/payment'

export class PaymentDataStore implements IPaymentDataStore {
  private readonly sheet: GoogleAppsScript.Spreadsheet.Sheet

  public constructor() {
    const id = PropertiesService.getScriptProperties().getProperty('SHEET_ID')
    if (!id) {
      throw new Error(`"SHEET_ID"のプロパティが設定されていません。`)
    }
    const ss = SpreadsheetApp.openById(id)
    if (!ss) {
      throw new Error('正しいシートIDではありません。')
    }
    const sheet = ss.getSheetByName('payments')
    if (!sheet) {
      throw new Error(`"payments"のシートが見つかりません。`)
    }
    this.sheet = sheet
  }

  private generatePayment(value: any[]): PaymentDataStructure {
    return {
      id: value[0],
      url: value[1],
      name: value[2],
      date: value[3],
      price: value[4],
      category: value[5],
      memo: value[6] || '',
    }
  }

  private isSameMonth(date1: Date, date2: Date): boolean {
    if (!date1 || !date2) {
      return false
    }
    var y1 = date1.getFullYear()
    var m1 = date1.getMonth() + 1

    var y2 = date2.getFullYear()
    var m2 = date2.getMonth() + 1

    return y1 === y2 && m1 === m2
  }

  public getByDate(date: Date): PaymentDataStructure[] {
    const lastRow = this.sheet.getLastRow()
    const lastColumn = this.sheet.getLastColumn()

    if (lastRow <= 0 || lastColumn <= 0) {
      return []
    }

    const values = this.sheet
      .getRange(2, 1, lastRow - 1, lastColumn - 1)
      .getValues()

    const payments = values.map((value: any[]) => {
      return this.generatePayment(value)
    })

    return payments.filter((payment: PaymentDataStructure) => {
      return this.isSameMonth(payment.date, date)
    })
  }
}
