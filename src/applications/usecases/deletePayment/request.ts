interface Params {
  action: string
  id: string
}

export class DeletePaymentInputData {
  public readonly action: string
  public readonly id: string

  constructor(data: string) {
    const params = this.getParams(data)
    this.valid(params)
    this.action = params.action
    this.id = params.id
  }

  private getParams(data: string): Params {
    let action = ''
    let id = ''
    data.split('&').forEach((item: string) => {
      const items = item.split('=')
      if (items[0] === 'action') {
        action = items[1]
        return
      }
      if (items[0] === 'id') {
        id = items[1]
        return
      }
    })

    return {
      action: action,
      id: id,
    }
  }

  private valid(params: Params): void {
    if (params.action === '') {
      throw new Error('actionは必須です。')
    }
    if (params.id === '') {
      throw new Error('idは必須です。')
    }

    if (params.action !== 'delete') {
      throw new Error('PostBackアクションで受け渡す値が正しくありません。')
    }
  }
}
