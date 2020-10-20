import { IPropatyDataStore } from '@/interfaces/frameworks/datastore/properties'

export class PropatyDataStore implements IPropatyDataStore {
  public getProperty(key: string): string {
    const propaty = PropertiesService.getScriptProperties().getProperty(key)
    if (!propaty) {
      throw new Error(`"${key}"のプロパティが設定されていません。`)
    }
    return propaty
  }
}
