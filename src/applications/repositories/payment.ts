import { Payment } from '@/domains/payment'

export type PaymentDataStructure = Payment

export interface IPaymentRepository {
  save(payment: PaymentDataStructure): boolean
  destory(id: string): number
  find(id: string): PaymentDataStructure | null
  getByDate(date: Date): PaymentDataStructure[]
}
