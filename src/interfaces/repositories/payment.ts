import {
  IPaymentRepository,
  PaymentDataStructure,
} from '@/applications/repositories/payment'
import { IPaymentDataStore } from '@/interfaces/frameworks/datastore/payment'

export class PaymentRepository implements IPaymentRepository {
  private readonly store: IPaymentDataStore

  constructor(store: IPaymentDataStore) {
    this.store = store
  }

  public save(payment: PaymentDataStructure): boolean {
    return this.store.save(payment)
  }

  public destory(id: string): number {
    return this.store.destory(id)
  }

  public getByDate(date: Date): PaymentDataStructure[] {
    return this.store.getByDate(date)
  }
}
