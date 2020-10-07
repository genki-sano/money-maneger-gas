import { HttpClient } from '@/infrastructures/gas/client/httpClient'
import { PaymentDataStore } from '@/infrastructures/gas/datastore/payment'
import { PropatyDataStore } from '@/infrastructures/gas/datastore/properties'
import { DoPostController } from '@/interfaces/controllers/doPost'
import { FormDataStore } from './infrastructures/gas/datastore/form'

declare const global: {
  [x: string]: any
}

const httpClient = new HttpClient()
const formDataStore = new FormDataStore()
const paymentDataStore = new PaymentDataStore()
const propatyDataStore = new PropatyDataStore()

global.doPost = (
  e: GoogleAppsScript.Events.DoPost,
): GoogleAppsScript.Content.TextOutput => {
  try {
    const controller = new DoPostController(
      httpClient,
      formDataStore,
      paymentDataStore,
      propatyDataStore,
    )
    controller.replyMessage(JSON.parse(e.postData.contents))
  } catch (e) {
    console.error(e.stack)
  }

  return ContentService.createTextOutput(
    JSON.stringify({ content: 'post ok' }),
  ).setMimeType(ContentService.MimeType.JSON)
}

global.onTimeDriven = (): void => {
  try {
  } catch (e) {
    console.error(e.stack)
  }
}

global.onFormSubmit = (e: GoogleAppsScript.Events.FormsOnFormSubmit): void => {
  try {
  } catch (e) {
    console.error(e.stack)
  }
}
