import { generateRecord, Record } from '@/domains/spreadsheet'
import { generatePrices, Prices } from '@/domains/user'
import { isSameMonth, formatDate } from '@/utils/date'
import { getProperty, getSheetByName } from '@/utils/gas'

export default class Spreadsheet {
  public readonly sheet: GoogleAppsScript.Spreadsheet.Sheet

  constructor() {
    this.sheet = getSheetByName('支払った金額')
  }

  public calcMonthlyPayment(date: Date): Prices {
    let women = 0
    let men = 0

    const lastRow = this.sheet.getLastRow()
    const lastColumn = this.sheet.getLastColumn()

    if (lastRow <= 0 || lastColumn <= 0) {
      return generatePrices(women, men)
    }

    const women_name = getProperty('WOMEN_NAME')
    const men_name = getProperty('MEN_NAME')

    const values = this.sheet
      .getRange(2, 1, lastRow - 1, lastColumn - 1)
      .getValues()

    values.forEach((value: any[]): void => {
      const record = generateRecord(value)
      if (!isSameMonth(record.date, date)) {
        return
      }

      if (record.name === women_name) {
        women += record.price
        return
      }
      if (record.name === men_name) {
        men += record.price
        return
      }
    })

    return generatePrices(women, men)
  }

  public getRecordInRow(row: number): Record {
    var lastColumn = this.sheet.getLastColumn()

    if (row <= 0 || lastColumn <= 0) {
      throw new Error('シートにレコードが登録されていません。')
    }

    var values = this.sheet.getRange(row, 1, 1, lastColumn).getValues()

    return generateRecord(values[0])
  }

  public setResponseId(row: number, id: string): void {
    var range = this.sheet.getRange(row, 1)
    if (range.getValue() === '') {
      range.setValue(id)
    }
  }

  public setEdiableUrl(row: number, url: string): void {
    var range = this.sheet.getRange(row, 2)
    if (range.getValue() === '') {
      range.setValue(url)
    }
  }

  public setDate(row: number, date: Date): void {
    var range = this.sheet.getRange(row, 5)
    if (range.getValue() === '') {
      range.setValue(formatDate(date))
    }
  }
}
