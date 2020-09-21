import IEventMessageUseCase from '@/usecases/line/webhook/eventMessage/interface'
import { getJamesWink } from '@/domains/line/emoji'
import { generateTextMessage } from '@/domains/line/message'
import { getProperty } from '@/utils/gas'
import { Message } from '@/@types/line/message'
import { EventMessage } from '@/@types/line/webhook'

export default class EventMessageUseCase implements IEventMessageUseCase {
  public readonly eventMessage: EventMessage

  constructor(eventMessage: EventMessage) {
    this.eventMessage = eventMessage
  }

  public getMessages(): Message[] {
    const messages: Message[] = []
    const text = 'フォームから支出を登録してね$ \n' + getProperty('FORM_URL')
    messages.push(generateTextMessage(text, getJamesWink(text.indexOf('$'))))
    return messages
  }
}
