import { IPropatyDataStore } from '@/infrastructures/datastore/properties'

export class PropatyDataStore implements IPropatyDataStore {
  public getProperty(key: string): string {
    const propaty = PropertiesService.getScriptProperties().getProperty(key)
    if (!propaty) {
      throw new Error(`"${key}"のプロパティが設定されていません。`)
    }
    return propaty
  }
}
