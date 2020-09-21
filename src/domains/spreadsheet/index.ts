export interface Record {
  id: string
  edit_url: string
  name: string
  date: Date
  price: number
  category: string
  memo: string
}

export const generateRecord = (values: any[]): Record => {
  return {
    id: values[0],
    edit_url: values[1],
    name: values[3],
    date: values[4],
    price: values[5],
    category: values[6],
    memo: values[7],
  }
}
