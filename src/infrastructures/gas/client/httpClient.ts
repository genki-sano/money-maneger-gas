import {
  IHttpClient,
  PostHttpHeaders,
  RequestBody,
} from '@/infrastructures/client/httpClient'

export class HttpClient implements IHttpClient {
  public async post(url: string, headers: PostHttpHeaders, body: RequestBody) {
    const ret = await UrlFetchApp.fetch(url, {
      method: 'post',
      headers: headers,
      payload: JSON.stringify(body),
    })

    return ret.getResponseCode()
  }
}
