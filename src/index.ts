declare const global: {
  [x: string]: any
}

import PushMessageController from '@/interfaces/controllers/line/pushMessage'
import WebhookController from '@/interfaces/controllers/line/webhook'
import { getProperty } from '@/utils/gas'

global.doPost = (
  e: GoogleAppsScript.Events.DoPost,
): GoogleAppsScript.Content.TextOutput => {
  try {
    const webhook = new WebhookController(
      getProperty('LINE_CHANNEL_ACCESS_TOKEN'),
    )
    webhook.execute(JSON.parse(e.postData.contents))
  } catch (e) {
    console.log('ERROR: ', e.message)
  }

  return ContentService.createTextOutput(
    JSON.stringify({ content: 'post ok' }),
  ).setMimeType(ContentService.MimeType.JSON)
}

global.pushMonthlyMessage = (): void => {
  try {
    const pushMessage = new PushMessageController(
      getProperty('LINE_CHANNEL_ACCESS_TOKEN'),
    )
    pushMessage.monthly()
  } catch (e) {
    console.log('ERROR: ', e.message)
  }
}

global.pushInsertMessage = (
  e: GoogleAppsScript.Events.SheetsOnFormSubmit,
): void => {
  try {
    const pushMessage = new PushMessageController(
      getProperty('LINE_CHANNEL_ACCESS_TOKEN'),
    )
    pushMessage.insert(e.range)
  } catch (e) {
    console.log('ERROR: ', e.message)
  }
}
