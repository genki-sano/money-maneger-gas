export interface PaymentDataStructure {
  id: string
  url: string
  name: string
  date: Date
  price: number
  category: string
  memo: string
}

export interface IPaymentRepository {
  getByDate(date: Date): PaymentDataStructure[]
}
