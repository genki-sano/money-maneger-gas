export class HttpClientConfig {
  public readonly Authorization: string

  public constructor(channelAccessToken: string) {
    this.Authorization = `Bearer ${channelAccessToken}`
  }
}
