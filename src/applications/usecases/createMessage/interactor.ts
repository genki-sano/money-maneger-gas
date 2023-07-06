import { FlexContainer } from '@/@types/line/message'
import {
  IPaymentRepository,
  PaymentDataStructure,
} from '@/applications/repositories/payment'
import { IPropatyRepository } from '@/applications/repositories/propaty'
import { Diff } from '@/domains/diff'
import { Emoji } from '@/domains/message/emoji'
import { FlexMessage } from '@/domains/message/flexMessage'
import { Message } from '@/domains/message/message'
import { TextMessage } from '@/domains/message/textMessage'
import { Payment } from '@/domains/payment'
import { User } from '@/domains/user'
import { numberWithDelimiter } from '@/utils'
import { formatDate, getLastMonth } from '@/utils/date'

export class CreateMessageUseCase {
  private readonly paymentRepository: IPaymentRepository
  private readonly propatyRepository: IPropatyRepository

  constructor(
    paymentRepository: IPaymentRepository,
    propatyRepository: IPropatyRepository,
  ) {
    this.paymentRepository = paymentRepository
    this.propatyRepository = propatyRepository
  }

  public createGetUserIdMessage(
    userId: string = '取得できませんでした。',
  ): Message {
    const text = 'あなたのUserIdは下記の通りです$ \n\n' + userId
    return new TextMessage(text, this.getJamesWinkEmoji(text.indexOf('$')))
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

  public createMonthlyReportMessage(): Message {
    const women = new User(this.propatyRepository.getWomenName(), 0)
    const men = new User(this.propatyRepository.getMenName(), 0)

    const lastMonth = getLastMonth(new Date())
    const payments = this.paymentRepository.getByDate(lastMonth)

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

    const diff = new Diff(women, men)

    return new FlexMessage(
      '先月の精算をしてね！',
      this.getMonthlyReportMessageContents(diff),
    )
  }

  public createOtherMessage(): Message {
    const text = 'その形式では返信できません$'
    return new TextMessage(text, this.getConyTroubleEmoji(text.indexOf('$')))
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
                    text: payment.memo || '(未入力)',
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
    }
  }

  private getMonthlyReportMessageContents(diff: Diff): FlexContainer {
    return {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'FROM（支払う人）',
                color: '#ffffff88',
                size: 'sm',
              },
              {
                type: 'text',
                text: diff.from,
                color: '#ffffff',
                size: 'xl',
                flex: 4,
                weight: 'bold',
              },
            ],
          },
          {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: 'TO（貰える人）',
                color: '#ffffff88',
                size: 'sm',
              },
              {
                type: 'text',
                text: diff.to,
                color: '#ffffff',
                size: 'xl',
                flex: 4,
                weight: 'bold',
              },
            ],
          },
        ],
        paddingAll: '20px',
        backgroundColor: '#1DB446',
        spacing: 'md',
        paddingTop: '22px',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '先月分の精算をしてね！',
            color: '#aaaaaa',
            size: 'sm',
          },
          {
            type: 'text',
            text: `${numberWithDelimiter(diff.price)}円`,
            weight: 'bold',
            size: '3xl',
            color: '#1DB446',
          },
          {
            type: 'separator',
            margin: 'xxl',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'xxl',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: diff.women.name,
                    color: '#aaaaaa',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: `${numberWithDelimiter(diff.women.price)}円`,
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
                    text: diff.men.name,
                    color: '#aaaaaa',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: `${numberWithDelimiter(diff.men.price)}円`,
                    align: 'end',
                  },
                ],
              },
            ],
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
