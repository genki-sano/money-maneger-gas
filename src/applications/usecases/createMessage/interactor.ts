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
import { Payment } from '@/domains/payment'
import { User } from '@/domains/user'
import { numberWithDelimiter } from '@/utils'
import { formatDate } from '@/utils/date'

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
    const women = new User(this.propatyRepository.getWomenName(), 0)
    const men = new User(this.propatyRepository.getMenName(), 0)

    const payments = this.paymentRepository.getByDate(new Date())

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

    return new FlexMessage(
      '今月は下記金額を払っているよ！',
      this.getTempReportMessageContents(women, men),
    )
  }

  public createInsertReportMessage(payment: Payment): Message {
    const women = new User(this.propatyRepository.getWomenName(), 0)
    const men = new User(this.propatyRepository.getMenName(), 0)

    const payments = this.paymentRepository.getByDate(new Date())

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

    return new FlexMessage(
      '支払い登録が完了したよ！',
      this.getInsertReportMessageContents(payment, women, men),
    )
  }

  public createOtherMessage(): Message {
    const formUrl = this.fromRepository.getPublishedUrl()
    const text = 'フォームから支出を登録してね$ \n' + formUrl
    return new TextMessage(text, this.getJamesWinkEmoji(text.indexOf('$')))
  }

  public createDeletedMessage(): Message {
    const text = 'この支出は、すでに削除されています$'
    return new TextMessage(text, this.getConyTroubleEmoji(text.indexOf('$')))
  }

  public createDeleteMessage(count: number): Message {
    const text = `${count}件削除しました$`
    return new TextMessage(text, this.getSallyPoseEmoji(text.indexOf('$')))
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
                    text: `${numberWithDelimiter(women.price)}円`,
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
                    text: `${numberWithDelimiter(men.price)}円`,
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

  private getInsertReportMessageContents(
    payment: Payment,
    women: User,
    men: User,
  ): FlexContainer {
    return {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '支出を入力したよ！',
            size: 'sm',
            margin: 'md',
            color: '#aaaaaa',
          },
          {
            type: 'text',
            text: `${numberWithDelimiter(payment.price)}円`,
            size: '3xl',
            weight: 'bold',
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
                    text: '日付',
                    color: '#aaaaaa',
                    flex: 2,
                    size: 'sm',
                  },
                  {
                    type: 'text',
                    text: `${formatDate(payment.date, '/')}`,
                    flex: 5,
                    size: 'sm',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: 'カテゴリ',
                    color: '#aaaaaa',
                    flex: 2,
                    size: 'sm',
                  },
                  {
                    type: 'text',
                    text: payment.category,
                    flex: 5,
                    size: 'sm',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: 'メモ',
                    color: '#aaaaaa',
                    flex: 2,
                    size: 'sm',
                  },
                  {
                    type: 'text',
                    text: payment.memo,
                    flex: 5,
                    size: 'sm',
                  },
                ],
              },
            ],
            margin: 'lg',
            spacing: 'xs',
          },
          {
            type: 'separator',
            margin: 'xxl',
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
                    flex: 0,
                    color: '#aaaaaa',
                  },
                  {
                    type: 'text',
                    text: `${numberWithDelimiter(women.price)}円`,
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
                    flex: 0,
                    color: '#aaaaaa',
                  },
                  {
                    type: 'text',
                    text: `${numberWithDelimiter(men.price)}円`,
                    align: 'end',
                  },
                ],
              },
            ],
            margin: 'xxl',
            spacing: 'sm',
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'separator',
          },
          {
            type: 'button',
            color: '#ff5551',
            action: {
              type: 'postback',
              label: '削除する',
              data: `action=delete&&id=${payment.id}`,
              displayText: '削除する',
            },
            margin: 'md',
          },
        ],
      },
    }
  }

  private getConyTroubleEmoji(index: number): Emoji {
    return new Emoji(index, '5ac1bfd5040ab15980c9b435', '058')
  }

  private getSallyPoseEmoji(index: number): Emoji {
    return new Emoji(index, '5ac1bfd5040ab15980c9b435', '082')
  }

  private getJamesWinkEmoji(index: number): Emoji {
    return new Emoji(index, '5ac1bfd5040ab15980c9b435', '098')
  }
}
