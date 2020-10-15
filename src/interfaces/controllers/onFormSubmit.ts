import { SavePaymentUseCase } from '@/applications/usecases/savePayment/interactor'
import { SavePaymentInputData } from '@/applications/usecases/savePayment/request'
import { IPaymentDataStore } from '@/infrastructures/datastore/payment'
import { SavePaymentRequest } from '@/infrastructures/request/onFormSubmit'
import { PaymentRepository } from '@/interfaces/repositories/payment'

export class OnFormSubmitController {
  private readonly savePaymentUseCase: SavePaymentUseCase

  constructor(paymentStore: IPaymentDataStore) {
    const paymentRepository = new PaymentRepository(paymentStore)

    this.savePaymentUseCase = new SavePaymentUseCase(paymentRepository)
  }

  public savePayment(request: SavePaymentRequest): void {
    const inputData = new SavePaymentInputData(request)
    this.savePaymentUseCase.savePayment(inputData)
  }
}
