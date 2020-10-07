import { IFormDataStore } from '@/infrastructures/datastore/form'

export class FormDataStore implements IFormDataStore {
  private readonly form: GoogleAppsScript.Forms.Form

  public constructor() {
    const form = FormApp.getActiveForm()
    if (!form) {
      throw new Error('フォームが紐付いていません。')
    }
    this.form = form
  }

  public getPublishedUrl(): string {
    const url = this.form.getPublishedUrl()
    return this.form.shortenFormUrl(url)
  }
}
