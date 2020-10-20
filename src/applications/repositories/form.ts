export interface IFormRepository {
  deleteResponse(id: string): number
  getPublishedUrl(): string
}
