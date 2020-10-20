import { zeroPadding } from '@/utils'

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
  var y1 = date1.getFullYear()
  var m1 = date1.getMonth()

  var y2 = date2.getFullYear()
  var m2 = date2.getMonth()

  return y1 === y2 && m1 === m2
}

export const getLastMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1)
}
