import { Message } from '@/domains/message/message'

export class PushMessageRequestBody {
  public readonly to: string
  public readonly messages: Message[]
  public readonly notificationDisabled?: boolean

  public constructor(
    to: string,
    messages: Message[],
    notificationDisabled: boolean = false,
  ) {
    this.to = to
    this.messages = messages
    this.notificationDisabled = notificationDisabled
  }
}

export const PushMessageRequestBodyBusinessRule = {
  isMessagesLengthValid(messages: Message[]): boolean {
    return messages.length >= 0 && messages.length <= 5
  },
}
