import { HttpClient } from '@/infrastructures/gas/client/httpClient'
import { PaymentDataStore } from '@/infrastructures/gas/datastore/payment'
import { PropatyDataStore } from '@/infrastructures/gas/datastore/properties'
import { DoPostController } from '@/interfaces/controllers/doPost'

declare const global: {
  [x: string]: any
}

const httpClient = new HttpClient()
const paymentDataStore = new PaymentDataStore()
const propatyDataStore = new PropatyDataStore()

global.doPost = (
  e: GoogleAppsScript.Events.DoPost,
): GoogleAppsScript.Content.TextOutput => {
  try {
    const controller = new DoPostController(
      httpClient,
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

global.onTimeDriven = (): void => {}

global.onFormSubmit = (
  e: GoogleAppsScript.Events.SheetsOnFormSubmit,
): void => {}
