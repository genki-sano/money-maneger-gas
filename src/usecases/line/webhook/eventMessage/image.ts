import IEventMessageUseCase from '@/usecases/line/webhook/eventMessage/interface'
import { getConyCry } from '@/domains/line/emoji'
import { generateTextMessage } from '@/domains/line/message'
import { getProperty } from '@/utils/gas'
import { Message } from '@/@types/line/message'
import { ImageEventMessage } from '@/@types/line/webhook'

export default class ImageEventMessageUseCase implements IEventMessageUseCase {
  public readonly eventMessage: ImageEventMessage

  constructor(eventMessage: ImageEventMessage) {
    this.eventMessage = eventMessage
  }

  public getMessages(): Message[] {
    const messages: Message[] = []
    const text =
      'ごめんね$ \n' +
      '上手く読み込めなかった... \n' +
      'フォームから追加してもらえると嬉しいな！ \n' +
      getProperty('FORM_URL')
    messages.push(generateTextMessage(text, getConyCry(text.indexOf('$'))))
    return messages
  }
}
