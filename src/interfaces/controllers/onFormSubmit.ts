import { CreateMessageUseCase } from '@/applications/usecases/createMessage/interactor'
import { PushMessageUseCase } from '@/applications/usecases/pushMessage/interactor'
import { SavePaymentUseCase } from '@/applications/usecases/savePayment/interactor'
import { SavePaymentInputData } from '@/applications/usecases/savePayment/request'
import { IHttpClient } from '@/infrastructures/client/httpClient'
import { IFormDataStore } from '@/infrastructures/datastore/form'
import { IPaymentDataStore } from '@/infrastructures/datastore/payment'
import { IPropatyDataStore } from '@/infrastructures/datastore/properties'
import { SavePaymentRequest } from '@/infrastructures/request/onFormSubmit'
import { PaymentRepository } from '@/interfaces/repositories/payment'
import { FormRepository } from '@/interfaces/repositories/form'
import { LineRepository } from '@/interfaces/repositories/line'
import { PropatyRepository } from '@/interfaces/repositories/propaty'
import { Message } from '@/domains/message/message'
import { PushMessageInputData } from '@/applications/usecases/pushMessage/request'

export class OnFormSubmitController {
  private readonly savePaymentUseCase: SavePaymentUseCase
  private readonly createMessageUseCase: CreateMessageUseCase
  private readonly pushMessageUseCase: PushMessageUseCase

  constructor(
    httpClient: IHttpClient,
    formStore: IFormDataStore,
    paymentStore: IPaymentDataStore,
    propatyStore: IPropatyDataStore,
  ) {
    const formRepository = new FormRepository(formStore)
    const lineRepository = new LineRepository(httpClient)
    const paymentRepository = new PaymentRepository(paymentStore)
    const propatyRepository = new PropatyRepository(propatyStore)

    this.savePaymentUseCase = new SavePaymentUseCase(paymentRepository)
    this.createMessageUseCase = new CreateMessageUseCase(
      formRepository,
      paymentRepository,
      propatyRepository,
    )
    this.pushMessageUseCase = new PushMessageUseCase(
      lineRepository,
      propatyRepository,
    )
  }

  public savePayment(request: SavePaymentRequest): void {
    const saveInputData = new SavePaymentInputData(request)
    const payment = this.savePaymentUseCase.savePayment(saveInputData)
    if (!payment) {
      throw new Error('支出の登録に失敗しました。')
    }

    const pushInoutData = new PushMessageInputData([
      this.createMessageUseCase.createInsertReportMessage(payment),
    ])
    this.pushMessageUseCase.pushMessage(pushInoutData)
  }
}
