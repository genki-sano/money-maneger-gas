import { CreateMessageUseCase } from '@/applications/usecases/createMessage/interactor'
import { PushMessageUseCase } from '@/applications/usecases/pushMessage/interactor'
import { PushMessageInputData } from '@/applications/usecases/pushMessage/request'
import { IHttpClient } from '@/interfaces/frameworks/client/httpClient'
import { IFormDataStore } from '@/interfaces/frameworks/datastore/form'
import { IPaymentDataStore } from '@/interfaces/frameworks/datastore/payment'
import { IPropatyDataStore } from '@/interfaces/frameworks/datastore/properties'
import { FormRepository } from '@/interfaces/repositories/form'
import { LineRepository } from '@/interfaces/repositories/line'
import { PaymentRepository } from '@/interfaces/repositories/payment'
import { PropatyRepository } from '@/interfaces/repositories/propaty'

export class OnTimeDrivenController {
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

  public pushMonthlyReportMessage(): void {
    const pushInoutData = new PushMessageInputData([
      this.createMessageUseCase.createMonthlyReportMessage(),
    ])
    this.pushMessageUseCase.pushMessage(pushInoutData)
  }
}
