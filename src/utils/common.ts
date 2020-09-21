export const toArray = <T>(maybeArr: T | T[]): T[] => {
  return Array.isArray(maybeArr) ? maybeArr : [maybeArr]
}

export const zeroPadding = (num: number, len: number): string => {
  return (Array(len).join('0') + num).slice(-len)
}

export const numberWithDelimiter = (num: number): string => {
  return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}
