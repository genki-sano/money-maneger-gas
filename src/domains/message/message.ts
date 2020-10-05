import { FlexMessage } from '@/domains/message/flexMessage'
import { TextMessage } from '@/domains/message/textMessage'

export type Message = TextMessage | FlexMessage
