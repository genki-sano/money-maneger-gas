import { ILineRepository } from '@/applications/repositories/line'
import { HttpClientConfig } from '@/domains/config/httpClientConfig'
import { PushMessageRequestBody } from '@/domains/requestBody/pushMessage'
import { ReplayMessageRequestBody } from '@/domains/requestBody/replayMessage'
import { IHttpClient } from '@/interfaces/frameworks/client/httpClient'

export class LineRepository implements ILineRepository {
  private readonly http: IHttpClient

  constructor(http: IHttpClient) {
    this.http = http
  }

  public replyMessage(
    config: HttpClientConfig,
    body: ReplayMessageRequestBody,
  ): void {
    const url = 'https://api.line.me/v2/bot/message/reply'
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      ...config,
    }
    this.http.post(url, headers, body)
  }

  public pushMessage(
    config: HttpClientConfig,
    body: PushMessageRequestBody,
  ): void {
    const url = 'https://api.line.me/v2/bot/message/push'
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      ...config,
    }
    this.http.post(url, headers, body)
  }
}
