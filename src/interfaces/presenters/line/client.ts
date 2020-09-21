import HTTPClient from '@/interfaces/presenters/line/http'
import { Message } from '@/@types/line/message'

interface ClientConfig {
  channelAccessToken: string
}

export default class Client {
  private readonly http: HTTPClient

  constructor(config: ClientConfig) {
    this.http = new HTTPClient({
      Authorization: `Bearer ${config.channelAccessToken}`,
    })
  }

  public replyMessage(
    replyToken: string,
    messages: Message[],
    notificationDisabled: boolean = false,
  ): GoogleAppsScript.URL_Fetch.HTTPResponse {
    const url = 'https://api.line.me/v2/bot/message/reply'
    const body = {
      replyToken: replyToken,
      messages: messages,
      notificationDisabled: notificationDisabled,
    }
    return this.http.post(url, body)
  }

  public sendPushMessage(
    userId: string,
    messages: Message[],
    notificationDisabled: boolean = false,
  ): GoogleAppsScript.URL_Fetch.HTTPResponse {
    const url = 'https://api.line.me/v2/bot/message/push'
    const body = {
      to: userId,
      messages: messages,
      notificationDisabled: notificationDisabled,
    }
    return this.http.post(url, body)
  }
}
