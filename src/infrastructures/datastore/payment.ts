import { PaymentDataStructure } from '@/applications/repositories/payment'

export interface IPaymentDataStore {
  getByDate(date: Date): Promise<PaymentDataStructure[]>
}
