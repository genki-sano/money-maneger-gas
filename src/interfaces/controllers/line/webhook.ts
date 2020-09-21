import Client from '@/interfaces/presenters/line/client'
import { eventMessageUseCaseClassMapper } from '@/usecases/line/webhook/classMapper'
import { WebhookRequestBody, WebhookEvent } from '@/@types/line/webhook'

export default class WebhookController {
  private readonly client: Client

  constructor(channelAccessToken: string) {
    this.client = new Client({
      channelAccessToken: channelAccessToken,
    })
  }

  public execute(request: WebhookRequestBody): void {
    request.events.forEach((event: WebhookEvent) => {
      if (event.type !== 'message') {
        return
      }
      const eventMessageUseCase = eventMessageUseCaseClassMapper(event.message)

      this.client.replyMessage(
        event.replyToken,
        eventMessageUseCase.getMessages(),
      )
    })
  }
}
