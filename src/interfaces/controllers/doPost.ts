import { WebhookEvent, WebhookRequestBody } from '@/@types/line/webhook'
import { CreateMessageUseCase } from '@/applications/usecases/createMessage/interactor'
import { ReplyMessageInputData } from '@/applications/usecases/replyMessage/request'
import { ReplyMessageUseCase } from '@/applications/usecases/replyMessage/interactor'
import { Message } from '@/domains/message/message'
import { IHttpClient } from '@/interfaces/frameworks/client/httpClient'
import { IPaymentDataStore } from '@/interfaces/frameworks/datastore/payment'
import { IPropatyDataStore } from '@/interfaces/frameworks/datastore/properties'
import { FormRepository } from '@/interfaces/repositories/form'
import { LineRepository } from '@/interfaces/repositories/line'
import { PaymentRepository } from '@/interfaces/repositories/payment'
import { PropatyRepository } from '@/interfaces/repositories/propaty'
import { IFormDataStore } from '@/interfaces/frameworks/datastore/form'
import { DeletePaymentInputData } from '@/applications/usecases/deletePayment/request'
import { DeletePaymentUseCase } from '@/applications/usecases/deletePayment/interactor'

export class DoPostController {
  private readonly createMessageUseCase: CreateMessageUseCase
  private readonly deletePaymentUseCase: DeletePaymentUseCase
  private readonly replyMessageUseCase: ReplyMessageUseCase

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
    this.deletePaymentUseCase = new DeletePaymentUseCase(
      formRepository,
      paymentRepository,
    )
    this.replyMessageUseCase = new ReplyMessageUseCase(
      lineRepository,
      propatyRepository,
    )
  }

  public replyMessage(request: WebhookRequestBody): void {
    request.events.forEach((event: WebhookEvent) => {
      let messages: Message[] = []
      let replyToken = ''

      if (event.type === 'message') {
        replyToken = event.replyToken
        if (event.message.type === 'text') {
          if (event.message.text === 'id') {
            messages.push(
              this.createMessageUseCase.createGetUserIdMessage(
                event.source.userId,
              ),
            )
          } else {
            messages.push(this.createMessageUseCase.createOtherMessage())
          }
        } else {
          messages.push(this.createMessageUseCase.createOtherMessage())
        }
      }
      if (event.type === 'postback') {
        replyToken = event.replyToken
        const deleteInputData = new DeletePaymentInputData(event.postback.data)
        const cnt = this.deletePaymentUseCase.deletePayment(deleteInputData)
        if (cnt === 0) {
          messages.push(this.createMessageUseCase.createDeletedMessage())
        } else {
          messages.push(this.createMessageUseCase.createDeleteMessage(cnt))
        }
      }

      if (replyToken === '' || messages.length === 0) {
        return
      }

      const replyMessageInputData = new ReplyMessageInputData(
        replyToken,
        messages,
      )
      this.replyMessageUseCase.replyMessage(replyMessageInputData)
    })
  }
}
