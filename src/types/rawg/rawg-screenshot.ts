export interface RawgScreenshotResponse {
  count: number;
  results: RawgScreenshot[];
}

export interface RawgScreenshot {
  id: number;
  image: string;
  width: number;
  height: number;
}
