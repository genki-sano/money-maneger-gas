import { HttpClientConfig } from '@/domains/config/httpClientConfig'
import { PushMessageRequestBody } from '@/domains/requestBody/pushMessage'
import { ReplayMessageRequestBody } from '@/domains/requestBody/replayMessage'

export interface ILineRepository {
  replyMessage(config: HttpClientConfig, body: ReplayMessageRequestBody): void
  pushMessage(config: HttpClientConfig, body: PushMessageRequestBody): void
}
