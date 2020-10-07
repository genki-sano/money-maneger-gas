import { WebhookEvent, WebhookRequestBody } from '@/@types/line/webhook'
import { CreateMessageUseCase } from '@/applications/usecases/createMessage/interactor'
import { ReplyMessageInputData } from '@/applications/usecases/replyMessage/request'
import { ReplyMessageUseCase } from '@/applications/usecases/replyMessage/interactor'
import { Message } from '@/domains/message/message'
import { IHttpClient } from '@/infrastructures/client/httpClient'
import { IPaymentDataStore } from '@/infrastructures/datastore/payment'
import { IPropatyDataStore } from '@/infrastructures/datastore/properties'
import { FormRepository } from '@/interfaces/repositories/form'
import { LineRepository } from '@/interfaces/repositories/line'
import { PaymentRepository } from '@/interfaces/repositories/payment'
import { PropatyRepository } from '@/interfaces/repositories/propaty'
import { IFormDataStore } from '@/infrastructures/datastore/form'

export class DoPostController {
  public readonly createMessageUseCase: CreateMessageUseCase
  public readonly replyMessageUseCase: ReplyMessageUseCase

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
    this.replyMessageUseCase = new ReplyMessageUseCase(
      lineRepository,
      propatyRepository,
    )
  }

  public replyMessage(request: WebhookRequestBody): void {
    let messages: Message[] = []
    let replyToken = ''

    request.events.forEach((event: WebhookEvent) => {
      if (event.type === 'message') {
        replyToken = event.replyToken
        if (event.message.type === 'text') {
          if (event.message.text === 'レポート') {
            const message = this.createMessageUseCase.createTempReportMessage()
            messages.push(message)
          } else {
            const message = this.createMessageUseCase.createOtherMessage()
            messages.push(message)
          }
        } else {
          const message = this.createMessageUseCase.createOtherMessage()
          messages.push(message)
        }
      }
    })

    if (replyToken === '' || messages.length === 0) {
      return
    }

    const replyMessageInputData = new ReplyMessageInputData(
      replyToken,
      messages,
    )
    this.replyMessageUseCase.replyMessage(replyMessageInputData)
  }
}
