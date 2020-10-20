import { IFormRepository } from '@/applications/repositories/form'
import { IFormDataStore } from '@/interfaces/frameworks/datastore/form'

export class FormRepository implements IFormRepository {
  private readonly store: IFormDataStore

  public constructor(store: IFormDataStore) {
    this.store = store
  }

  public deleteResponse(id: string): number {
    return this.store.deleteResponse(id)
  }

  public getPublishedUrl(): string {
    return this.store.getPublishedUrl()
  }
}
