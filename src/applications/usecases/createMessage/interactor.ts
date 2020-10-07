import { FlexContainer } from '@/@types/line/message'
import { IFormRepository } from '@/applications/repositories/form'
import {
  IPaymentRepository,
  PaymentDataStructure,
} from '@/applications/repositories/payment'
import { IPropatyRepository } from '@/applications/repositories/propaty'
import { Emoji } from '@/domains/message/emoji'
import { FlexMessage } from '@/domains/message/flexMessage'
import { Message } from '@/domains/message/message'
import { TextMessage } from '@/domains/message/textMessage'
import { User } from '@/domains/user'

export class CreateMessageUseCase {
  private readonly fromRepository: IFormRepository
  private readonly paymentRepository: IPaymentRepository
  private readonly propatyRepository: IPropatyRepository

  constructor(
    fromRepository: IFormRepository,
    paymentRepository: IPaymentRepository,
    propatyRepository: IPropatyRepository,
  ) {
    this.fromRepository = fromRepository
    this.paymentRepository = paymentRepository
    this.propatyRepository = propatyRepository
  }

  public createTempReportMessage(): Message {
    const women = {
      name: this.propatyRepository.getWomenName(),
      price: 0,
    }
    const men = {
      name: this.propatyRepository.getMenName(),
      price: 0,
    }

    const date = new Date()
    const payments = this.paymentRepository.getByDate(date)

    payments.forEach((payment: PaymentDataStructure): void => {
      if (payment.name === women.name) {
        women.price += payment.price
        return
      }
      if (payment.name === men.name) {
        men.price += payment.price
        return
      }
    })

    const userW = new User('', women.name, women.price)
    const userM = new User('', men.name, men.price)

    return new FlexMessage(
      '今月は下記金額を払っているよ！',
      this.getTempReportMessageContents(userW, userM),
    )
  }

  private getTempReportMessageContents(women: User, men: User): FlexContainer {
    return {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'REPORT',
            color: '#1DB446',
            weight: 'bold',
          },
          {
            type: 'text',
            text: '今月は下記金額を払っているよ！',
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: women.name,
                    size: 'lg',
                    color: '#aaaaaa',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: `${this.numberWithDelimiter(women.price)}円`,
                    size: 'lg',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: men.name,
                    size: 'lg',
                    color: '#aaaaaa',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: `${this.numberWithDelimiter(men.price)}円`,
                    size: 'lg',
                    align: 'end',
                  },
                ],
              },
            ],
            spacing: 'md',
            margin: 'xxl',
          },
        ],
        spacing: 'md',
      },
    }
  }

  public createOtherMessage(): Message {
    const formUrl = this.fromRepository.getPublishedUrl()
    const text = 'フォームから支出を登録してね$ \n' + formUrl
    return new TextMessage(text, this.getJamesWinkEmoji(text.indexOf('$')))
  }

  private getJamesWinkEmoji(index: number): Emoji {
    return new Emoji(index, '5ac1bfd5040ab15980c9b435', '098')
  }

  private numberWithDelimiter(num: number): string {
    return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  }
}
