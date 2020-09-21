import EventMessageUseCase from '@/usecases/line/webhook/eventMessage/default'
import ImageEventMessageUseCase from '@/usecases/line/webhook/eventMessage/image'
import TextEventMessageUseCase from '@/usecases/line/webhook/eventMessage/text'
import { EventMessage } from '@/@types/line/webhook'

export const eventMessageUseCaseClassMapper = (eventMessage: EventMessage) => {
  if (eventMessage.type === 'text') {
    return new TextEventMessageUseCase(eventMessage)
  }
  if (eventMessage.type === 'image') {
    return new ImageEventMessageUseCase(eventMessage)
  }
  return new EventMessageUseCase(eventMessage)
}
