export interface IHtmlParser {
  getTitleFromUrl(url: string): Promise<string | null>
}
