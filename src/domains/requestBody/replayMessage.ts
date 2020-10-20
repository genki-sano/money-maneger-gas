import { Message } from '@/domains/message/message'

export class ReplayMessageRequestBody {
  public readonly replyToken: string
  public readonly messages: Message[]
  public readonly notificationDisabled?: boolean

  public constructor(
    replyToken: string,
    messages: Message[],
    notificationDisabled: boolean = false,
  ) {
    this.replyToken = replyToken
    this.messages = messages
    this.notificationDisabled = notificationDisabled
  }
}

export const ReplayMessageRequestBodyBusinessRule = {
  isMessagesLengthValid(messages: Message[]): boolean {
    return messages.length >= 0 && messages.length <= 5
  },
}
