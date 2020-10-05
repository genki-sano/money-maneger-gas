import { Message } from '@/domains/message/message'
import { ReplayMessageRequestBodyBusinessRule } from '@/domains/requestBody/replayMessage'

export class ReplyMessageInputData {
  public replyToken: string
  public messages: Message[]
  public notificationDisabled: boolean

  constructor(
    replyToken: string,
    messages: Message[],
    notificationDisabled: boolean = false,
  ) {
    this.valid(messages)
    this.replyToken = replyToken
    this.messages = messages
    this.notificationDisabled = notificationDisabled
  }

  private valid(messages: Message[]): void {
    if (!ReplayMessageRequestBodyBusinessRule.isMessagesLengthValid(messages)) {
      throw new Error('メッセージの最大送信数は5件です。')
    }
  }
}
