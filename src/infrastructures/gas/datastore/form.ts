import { IFormDataStore } from '@/interfaces/frameworks/datastore/form'

export class FormDataStore implements IFormDataStore {
  private readonly form: GoogleAppsScript.Forms.Form

  public constructor() {
    const form = FormApp.getActiveForm()
    if (!form) {
      throw new Error('フォームが紐付いていません。')
    }
    this.form = form
  }

  public deleteResponse(id: string): number {
    const beforeCnt = this.form.getResponses().length
    this.form.deleteResponse(id)
    const afterCnt = this.form.getResponses().length
    return beforeCnt - afterCnt
  }

  public getPublishedUrl(): string {
    const url = this.form.getPublishedUrl()
    return this.form.shortenFormUrl(url)
  }
}
