export interface PopulateOptions {
  path: string;
  select?: string;
  model?: string;
  match?: unknown;
  populate?: PopulateOptions | PopulateOptions[];
}
