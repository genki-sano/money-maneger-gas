import { RequestBody } from '@/@types/line/request'

interface HttpClientConfig {
  Authorization: string
}

export default class HTTPClient {
  private readonly config: HttpClientConfig

  constructor(config: HttpClientConfig) {
    this.config = config
  }

  private getHeaders(): GoogleAppsScript.URL_Fetch.HttpHeaders {
    return {
      'Content-Type': 'application/json; charset=UTF-8',
      ...this.config,
    }
  }

  public post(
    url: string,
    body: RequestBody,
  ): GoogleAppsScript.URL_Fetch.HTTPResponse {
    const params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      headers: this.getHeaders(),
      method: 'post',
      payload: JSON.stringify(body),
    }

    return UrlFetchApp.fetch(url, params)
  }
}
