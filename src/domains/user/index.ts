import { getProperty } from '@/utils/gas'

export interface Price {
  name: string
  price: number
}

export interface Prices {
  women: number
  men: number
}

export interface Diff {
  from: string
  to: string
  price: number
}

export const generateWomenPrice = (price: number): Price => {
  return {
    name: getProperty('WOMEN_NAME'),
    price: price,
  }
}

export const generateMenPrice = (price: number): Price => {
  return {
    name: getProperty('MEN_NAME'),
    price: price,
  }
}

export const generatePrices = (
  women_price: number,
  men_price: number,
): Prices => {
  return {
    women: women_price,
    men: men_price,
  }
}

export const generateDiff = (prices: Prices): Diff => {
  const diff = Math.round(Math.abs(prices.women - prices.men) / 2)
  const women_name = getProperty('WOMEN_NAME')
  const men_name = getProperty('MEN_NAME')

  if (prices.women < prices.men) {
    return {
      from: women_name,
      to: men_name,
      price: diff,
    }
  }
  return {
    from: men_name,
    to: women_name,
    price: diff,
  }
}
