import { Message } from '@/@types/line/message'

export type RequestBody = PushMessageRequestBody | ReplayMessageRequestBody

export type PushMessageRequestBody = {
  to: string
  messages: Message[]
  notificationDisabled?: boolean
}

export type ReplayMessageRequestBody = {
  replyToken: string
  messages: Message[]
  notificationDisabled?: boolean
}
