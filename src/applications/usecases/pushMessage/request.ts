import { Message } from '@/domains/message/message'
import { PushMessageRequestBodyBusinessRule } from '@/domains/requestBody/pushMessage'

export class PushMessageInputData {
  public readonly messages: Message[]
  public readonly notificationDisabled: boolean

  constructor(messages: Message[], notificationDisabled: boolean = false) {
    this.valid(messages)
    this.messages = messages
    this.notificationDisabled = notificationDisabled
  }

  private valid(messages: Message[]): void {
    if (!PushMessageRequestBodyBusinessRule.isMessagesLengthValid(messages)) {
      throw new Error('メッセージの最大送信数は5件です。')
    }
  }
}
