import { zeroPadding } from '@/utils'

export const formatMonth = (date: Date, separator: string = '/'): string => {
  const y = date.getFullYear()
  const m = zeroPadding(date.getMonth() + 1, 2)
  return y + separator + m
}

export const formatDate = (date: Date, separator: string = '/'): string => {
  const y = date.getFullYear()
  const m = zeroPadding(date.getMonth() + 1, 2)
  const d = zeroPadding(date.getDate(), 2)
  return y + separator + m + separator + d
}

export const formatDateTime = (date: Date, separator: string = '/'): string => {
  const y = date.getFullYear()
  const m = zeroPadding(date.getMonth() + 1, 2)
  const d = zeroPadding(date.getDate(), 2)
  const h = zeroPadding(date.getHours(), 2)
  const i = zeroPadding(date.getMinutes(), 2)
  const s = zeroPadding(date.getSeconds(), 2)
  return y + separator + m + separator + d + ' ' + h + ':' + i + ':' + s
}

export const isSameMonth = (date1: Date, date2: Date): boolean => {
  if (!date1 || !date2) {
    return false
  }
  const y1 = date1.getFullYear()
  const m1 = date1.getMonth()

  const y2 = date2.getFullYear()
  const m2 = date2.getMonth()

  return y1 === y2 && m1 === m2
}

export const getLastMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1)
}

const COEFFICIENT = 24 * 60 * 60 * 1000 //日数とミリ秒を変換する係数

const DATES_OFFSET = 70 * 365 + 17 + 1 + 1 //「1900/1/0」～「1970/1/1」 (日数)
const MILLIS_DIFFERENCE = 9 * 60 * 60 * 1000 //UTCとJSTの時差 (ミリ秒)

// UNIX時間(ミリ秒)→シリアル値
export const convertUt2Sn = (unixTimeMillis: number): number => {
  return (unixTimeMillis + MILLIS_DIFFERENCE) / COEFFICIENT + DATES_OFFSET
}

// シリアル値→UNIX時間(ミリ秒)
export const convertSn2Ut = (serialNumber: number): number => {
  return (serialNumber - DATES_OFFSET) * COEFFICIENT - MILLIS_DIFFERENCE
}

// シリアル値→Date
export const dateFromSn = (serialNumber: number): Date => {
  return new Date(convertSn2Ut(serialNumber))
}

// Date→シリアル値
export const dateToSn = (date: Date): number => {
  return convertUt2Sn(date.getTime())
}
