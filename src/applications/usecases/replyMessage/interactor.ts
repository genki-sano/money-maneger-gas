import { ILineRepository } from '@/applications/repositories/line'
import { IPropatyRepository } from '@/applications/repositories/propaty'
import { HttpClientConfig } from '@/domains/config/httpClientConfig'
import { ReplayMessageRequestBody } from '@/domains/requestBody/replayMessage'
import { ReplyMessageInputData } from './inputData'

export class ReplyMessageUseCase {
  private readonly lineRepository: ILineRepository
  private readonly propatyRepository: IPropatyRepository

  constructor(
    lineRepository: ILineRepository,
    propatyRepository: IPropatyRepository,
  ) {
    this.lineRepository = lineRepository
    this.propatyRepository = propatyRepository
  }

  public replyMessage(req: ReplyMessageInputData): void {
    const body = new ReplayMessageRequestBody(
      req.replyToken,
      req.messages,
      req.notificationDisabled,
    )
    const httpClientConfig = new HttpClientConfig(
      this.propatyRepository.getChannelAccessToken(),
    )
    this.lineRepository.replyMessage(httpClientConfig, body)
  }
}
