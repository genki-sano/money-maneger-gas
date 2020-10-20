import {
  IHttpClient,
  PostHttpHeaders,
  RequestBody,
} from '@/interfaces/frameworks/client/httpClient'

export class HttpClient implements IHttpClient {
  public post(
    url: string,
    headers: PostHttpHeaders,
    body: RequestBody,
  ): number {
    const ret = UrlFetchApp.fetch(url, {
      method: 'post',
      headers: headers,
      payload: JSON.stringify(body),
    })

    return ret.getResponseCode()
  }
}
