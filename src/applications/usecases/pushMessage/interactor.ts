import { ILineRepository } from '@/applications/repositories/line'
import { IPropatyRepository } from '@/applications/repositories/propaty'
import { HttpClientConfig } from '@/domains/config/httpClientConfig'
import { PushMessageRequestBody } from '@/domains/requestBody/pushMessage'
import { PushMessageInputData } from './request'

export class PushMessageUseCase {
  private readonly lineRepository: ILineRepository
  private readonly propatyRepository: IPropatyRepository

  constructor(
    lineRepository: ILineRepository,
    propatyRepository: IPropatyRepository,
  ) {
    this.lineRepository = lineRepository
    this.propatyRepository = propatyRepository
  }

  public pushMessage(req: PushMessageInputData): void {
    const httpClientConfig = new HttpClientConfig(
      this.propatyRepository.getChannelAccessToken(),
    )

    const womenBody = new PushMessageRequestBody(
      this.propatyRepository.getWomenId(),
      req.messages,
      req.notificationDisabled,
    )
    const menBody = new PushMessageRequestBody(
      this.propatyRepository.getMenId(),
      req.messages,
      req.notificationDisabled,
    )

    this.lineRepository.pushMessage(httpClientConfig, womenBody)
    this.lineRepository.pushMessage(httpClientConfig, menBody)
  }
}
