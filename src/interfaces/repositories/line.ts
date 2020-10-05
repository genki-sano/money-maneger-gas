import { ILineRepository } from '@/applications/repositories/line'
import { HttpClientConfig } from '@/domains/config/httpClientConfig'
import { PushMessageRequestBody } from '@/domains/requestBody/pushMessage'
import { ReplayMessageRequestBody } from '@/domains/requestBody/replayMessage'
import { IHttpClient } from '@/infrastructures/client/httpClient'

export class LineRepository implements ILineRepository {
  private readonly http: IHttpClient

  constructor(http: IHttpClient) {
    this.http = http
  }

  public async replyMessage(
    config: HttpClientConfig,
    body: ReplayMessageRequestBody,
  ) {
    const url = 'https://api.line.me/v2/bot/message/reply'
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      ...config,
    }
    await this.http.post(url, headers, body)
  }

  public async pushMessage(
    config: HttpClientConfig,
    body: PushMessageRequestBody,
  ) {
    const url = 'https://api.line.me/v2/bot/message/push'
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      ...config,
    }
    await this.http.post(url, headers, body)
  }
}
