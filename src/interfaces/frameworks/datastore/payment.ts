import { PaymentDataStructure } from '@/applications/repositories/payment'

export interface IPaymentDataStore {
  save(payment: PaymentDataStructure): boolean
  destory(id: string): number
  getByDate(date: Date): PaymentDataStructure[]
}
