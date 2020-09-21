import { numberWithDelimiter } from '@/utils/common'
import { FlexContainer } from '@/@types/line/message'
import { Record } from '@/domains/spreadsheet'
import { Price, Diff } from '@/domains/user'
import { formatDate } from '@/utils/date'

export const getTempReportMessageContents = (
  women: Price,
  men: Price,
): FlexContainer => {
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

export const getMonthlyMessageContents = (
  diff: Diff,
  women: Price,
  men: Price,
): FlexContainer => {
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
                  text: women.name,
                  color: '#aaaaaa',
                  flex: 0,
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
                  color: '#aaaaaa',
                  flex: 0,
                },
                {
                  type: 'text',
                  text: `${numberWithDelimiter(men.price)}円`,
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

export const getInsertMesaggeContents = (
  record: Record,
  uri: string,
  women: Price,
  men: Price,
): FlexContainer => {
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
          text: `${numberWithDelimiter(record.price)}円`,
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
                  text: `${formatDate(record.date)}`,
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
                  text: record.category,
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
                  text: record.memo,
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
          action: {
            type: 'uri',
            label: '修正する',
            uri: uri,
            altUri: {
              desktop: 'https://docs.google.com/forms',
            },
          },
          margin: 'md',
        },
      ],
    },
  }
}
