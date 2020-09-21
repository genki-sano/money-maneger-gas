import { zeroPadding } from '@/utils/common'

export const formatDate = (date: Date, delimiter: string = '/'): string => {
  var y = date.getFullYear()
  var m = zeroPadding(date.getMonth() + 1, 2)
  var d = zeroPadding(date.getDate(), 2)

  return y + delimiter + m + delimiter + d
}

export const isSameMonth = (date1: Date, date2: Date): boolean => {
  if (!date1 || !date2) {
    return false
  }
  var y1 = date1.getFullYear()
  var m1 = date1.getMonth() + 1

  var y2 = date2.getFullYear()
  var m2 = date2.getMonth() + 1

  return y1 === y2 && m1 === m2
}

export const getLastMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1)
}
