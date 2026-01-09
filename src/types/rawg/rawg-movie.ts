export interface RawgMovieResponse {
  count: number;
  results: RawgMovie[];
}

export interface RawgMovie {
  id: number;
  name: string;
  preview: string;
  data: {
    480?: string;
    max?: string;
  };
}
