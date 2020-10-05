import {
  IPaymentRepository,
  PaymentDataStructure,
} from '@/applications/repositories/payment'
import { IPaymentDataStore } from '@/infrastructures/datastore/payment'

export class PaymentRepository implements IPaymentRepository {
  private readonly store: IPaymentDataStore

  constructor(store: IPaymentDataStore) {
    this.store = store
  }

  public async getByDate(date: Date): Promise<PaymentDataStructure[]> {
    return await this.store.getByDate(date)
  }
}
