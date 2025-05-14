import { IngestedData } from './IngestedData';

export interface DataSourceProvider {
  name: string;
  fetch(): AsyncIterable<IngestedData>;
}
