import { PaymentBusinessRule } from '@/domains/payment'
import { SavePaymentRequest } from '@/interfaces/frameworks/request/onFormSubmit'

export class SavePaymentInputData {
  public readonly id: string
  public readonly name: string
  public readonly date: string
  public readonly price: string
  public readonly category: string
  public readonly memo: string

  constructor(param: SavePaymentRequest) {
    this.valid(param)
    this.id = param.id
    this.name = param.name
    this.date = param.date
    this.price = param.price
    this.category = param.category
    this.memo = param.memo
  }

  private valid(param: SavePaymentRequest): void {
    if (!PaymentBusinessRule.isIdRequiredValid(param.id)) {
      throw new Error('IDは必須です。')
    }
    if (!PaymentBusinessRule.isNameRequiredValid(param.name)) {
      throw new Error('名前は必須です。')
    }
    if (!PaymentBusinessRule.isDateRequiredValid(param.date)) {
      throw new Error('支払日は必須です。')
    }
    if (!PaymentBusinessRule.isPriceRequiredValid(param.price)) {
      throw new Error('金額は必須です。')
    }
    if (!PaymentBusinessRule.isCategoryRequiredValid(param.category)) {
      throw new Error('カテゴリは必須です。')
    }
  }
}
