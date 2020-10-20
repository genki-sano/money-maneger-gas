export interface SavePaymentRequest {
  id: string
  name: string
  date: string
  price: string
  category: string
  memo: string
}

export interface IOnFormSubmitRequest {
  savePaymentRequest(e: any): SavePaymentRequest
}
