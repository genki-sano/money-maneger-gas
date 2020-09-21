import { getProperty } from '@/utils/gas'

export default class Forms {
  public readonly from: GoogleAppsScript.Forms.Form

  constructor() {
    this.from = FormApp.openById(getProperty('FORM_ID'))
  }

  public getResponse(): GoogleAppsScript.Forms.FormResponse | null {
    const formResponses = this.from.getResponses()
    if (formResponses.length < 1) {
      return null
    }
    return formResponses[Number(formResponses.length - 1)]
  }

  public getLastEditResponseId(
    formResponse: GoogleAppsScript.Forms.FormResponse | null,
  ): string {
    if (formResponse == null) {
      return ''
    }
    return formResponse.getId()
  }

  public getLastEditResponseUrl(
    formResponse: GoogleAppsScript.Forms.FormResponse | null,
  ): string {
    if (formResponse == null) {
      return ''
    }
    return formResponse.getEditResponseUrl()
  }
}
