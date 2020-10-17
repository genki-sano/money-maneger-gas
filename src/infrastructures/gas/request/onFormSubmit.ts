import {
  IOnFormSubmitRequest,
  SavePaymentRequest,
} from '@/infrastructures/request/onFormSubmit'
import { formatDate } from '@/utils/date'

interface Params {
  name: string
  date: string
  price: string
  category: string
  memo: string
}

export class OnFormSubmitRequest implements IOnFormSubmitRequest {
  private readonly formResponse: GoogleAppsScript.Forms.FormResponse

  constructor(e: GoogleAppsScript.Events.FormsOnFormSubmit) {
    this.formResponse = e.response
  }

  public savePaymentRequest(): SavePaymentRequest {
    const params = this.getParams()

    return {
      id: this.formResponse.getId(),
      ...params,
    }
  }

  private getParams(): Params {
    const values: string[] = []
    const itemResponses = this.formResponse.getItemResponses()
    itemResponses.forEach(
      (itemResponse: GoogleAppsScript.Forms.ItemResponse) => {
        const value = itemResponse.getResponse()
        if (typeof value === 'string') {
          values.push(value)
        }
      },
    )

    return {
      name: values[0],
      date: values[1] || formatDate(new Date(), '-'),
      price: values[2],
      category: values[3],
      memo: values[4] || '',
    }
  }
}
