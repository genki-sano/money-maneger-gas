import { Payment } from '@/domains/payment'

export type PaymentDataStructure = Payment

export interface IPaymentRepository {
  save(payment: PaymentDataStructure): boolean
  destory(id: string): number
  getByDate(date: Date): PaymentDataStructure[]
}
