import { PushMessageRequestBody } from '@/domains/requestBody/pushMessage'
import { ReplayMessageRequestBody } from '@/domains/requestBody/replayMessage'

export type PostHttpHeaders = {
  [key in 'Content-Type' | 'Authorization']: string
}

export type RequestBody = PushMessageRequestBody | ReplayMessageRequestBody

export interface IHttpClient {
  post(url: string, headers: PostHttpHeaders, body: RequestBody): number
}
