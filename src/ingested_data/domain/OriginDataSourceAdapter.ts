export interface ExternalDataSourceAdapter {
  fetch<T>(): AsyncIterable<T>;
}
