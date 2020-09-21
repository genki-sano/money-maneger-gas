import { Message } from '@/@types/line/message'
import { EventMessage } from '@/@types/line/webhook'

export default interface IEventMessageUseCase {
  eventMessage: EventMessage
  getMessages(): Message[]
}
