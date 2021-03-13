import { IPropatyRepository } from '@/applications/repositories/propaty'
import { IPropatyDataStore } from '@/interfaces/frameworks/datastore/properties'

export class PropatyRepository implements IPropatyRepository {
  private readonly store: IPropatyDataStore

  constructor(store: IPropatyDataStore) {
    this.store = store
  }

  public getChannelAccessToken(): string {
    return this.store.getProperty('LINE_CHANNEL_ACCESS_TOKEN')
  }

  public getWomenId(): string {
    return this.store.getProperty('WOMAN_USER_ID')
  }

  public getWomenName(): string {
    return this.store.getProperty('WOMAN_NAME')
  }

  public getMenId(): string {
    return this.store.getProperty('MAN_USER_ID')
  }

  public getMenName(): string {
    return this.store.getProperty('MAN_NAME')
  }
}
