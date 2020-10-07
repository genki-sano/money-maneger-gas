import { IFormRepository } from '@/applications/repositories/form'
import { IFormDataStore } from '@/infrastructures/datastore/form'

export class FormRepository implements IFormRepository {
  private readonly store: IFormDataStore

  public constructor(store: IFormDataStore) {
    this.store = store
  }

  public getPublishedUrl(): string {
    return this.store.getPublishedUrl()
  }
}
