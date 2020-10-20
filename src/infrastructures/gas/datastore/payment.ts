import { PaymentDataStructure } from '@/applications/repositories/payment'
import { IPaymentDataStore } from '@/infrastructures/datastore/payment'
import { formatDate, formatDateTime, isSameMonth } from '@/utils/date'

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

  public save(payment: PaymentDataStructure): boolean {
    const lastRow = this.sheet.getLastRow()
    const targetRow = lastRow + 1

    this.sheet.getRange(targetRow, 1).setValue(payment.id)
    this.sheet.getRange(targetRow, 2).setValue(payment.name)
    this.sheet.getRange(targetRow, 3).setValue(formatDate(payment.date, '/'))
    this.sheet.getRange(targetRow, 4).setValue(payment.price)
    this.sheet.getRange(targetRow, 5).setValue(payment.category)
    this.sheet.getRange(targetRow, 6).setValue(payment.memo)
    this.sheet.getRange(targetRow, 7).setValue(formatDateTime(new Date(), '/'))

    return true
  }

  public destory(id: string): number {
    const startRow = 2
    const lastRow = this.sheet.getLastRow()
    const values = this.sheet
      .getRange(startRow, 1, lastRow - (startRow - 1))
      .getValues()

    let count = 0

    values.forEach((items: any[], key: number) => {
      if (items[0] === id) {
        this.sheet.deleteRow(key + startRow)
        count++
      }
    })

    return count
  }

  public find(id: string): PaymentDataStructure | null {
    const payments = this.getAll().filter((payment: PaymentDataStructure) => {
      return payment.id === id
    })

    return payments.length > 0 ? payments[0] : null
  }

  public getByDate(date: Date): PaymentDataStructure[] {
    return this.getAll().filter((payment: PaymentDataStructure) => {
      return isSameMonth(payment.date, date)
    })
  }

  private getAll(): PaymentDataStructure[] {
    const startRow = 2
    const lastRow = this.sheet.getLastRow()
    const lastColumn = this.sheet.getLastColumn()

    if (lastRow <= startRow - 1 || lastColumn <= 0) {
      return []
    }

    const values = this.sheet
      .getRange(startRow, 1, lastRow - (startRow - 1), lastColumn)
      .getValues()

    return values.map((value: any[]) => {
      return {
        id: value[0],
        name: value[1],
        date: value[2],
        price: value[3],
        category: value[4],
        memo: value[5] || '',
      }
    })
  }
}
