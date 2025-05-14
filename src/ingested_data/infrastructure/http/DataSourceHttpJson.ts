import { DataSourceProvider } from 'src/ingested_data/domain/DataSourceProvider';
import axios from 'axios';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';
import { IngestedData } from 'src/ingested_data/domain/IngestedData';

export abstract class DataSourceHttpJson implements DataSourceProvider {
  abstract readonly name: string;
  abstract readonly url: string;
  abstract dtoToDomain(source: string, value: unknown): IngestedData;

  async *fetch(): AsyncIterable<IngestedData> {
    const response = await axios.get(this.url, { responseType: 'stream' });
    const jsonStream = response.data.pipe(parser()).pipe(streamArray());

    for await (const { value } of jsonStream) {
      yield this.dtoToDomain(this.url, value);
    }
  }
}
