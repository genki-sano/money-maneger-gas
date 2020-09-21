export const getProperty = (key: string): string => {
  const propaty = PropertiesService.getScriptProperties().getProperty(key)
  if (!propaty) {
    throw new Error(`"${key}"のプロパティが設定されていません。`)
  }
  return propaty
}

export const getSheetByName = (
  name: string,
): GoogleAppsScript.Spreadsheet.Sheet => {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  if (!ss) {
    throw new Error('スプレッドシートが紐付いていません。')
  }
  const sheet = ss.getSheetByName(name)
  if (!sheet) {
    throw new Error(`"${name}"のシートが見つかりません。`)
  }
  return sheet
}
