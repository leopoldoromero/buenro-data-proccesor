import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IngestedData } from 'src/ingested_data/domain/IngestedData';
import { IngestedDataRepository } from 'src/ingested_data/domain/IngestedDataRepository';
import axios from 'axios';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';

@Injectable()
export class DataIngestor {
  constructor(
    @Inject('IngestedDataMongoRepository')
    private readonly repository: IngestedDataRepository,
    private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(DataIngestor.name);

  async execute(): Promise<void> {
    this.logger.log('Running data ingestion cron job...');
    const rawUrls = this.configService.get<string>('DATA_ORIGIN_URLS') || '';
    const urls = rawUrls.split(';').filter(Boolean);
    for (const url of urls) {
      try {
        const response = await axios.get(url, {
          responseType: 'stream',
        });

        const jsonStream = response.data.pipe(parser()).pipe(streamArray());
        const BATCH_SIZE = 100;
        let batch: IngestedData[] = [];

        for await (const { value } of jsonStream) {
          batch.push(
            new IngestedData({
              id: value.id,
              name: value?.name ?? '',
              city: value?.city ?? value?.address.city,
              country: value?.address?.country ?? '',
              isAvailable: value?.isAvailable ?? value?.availability,
              ...(value?.priceSegment && {
                priceSegment: value?.priceSegment,
              }),
              pricePerNight: value?.priceForNight ?? value.pricePerNight,
              source: url,
              ingestedAt: new Date(),
            }),
          );

          if (batch.length >= BATCH_SIZE) {
            await this.repository.persistMany(batch);
            batch = [];
          }
        }

        if (batch.length > 0) {
          await this.repository.persistMany(batch);
        }

        this.logger.log(`Finished ingesting from ${url}`);
      } catch (error) {
        this.logger.error(`Failed to ingest from ${url}`, error);
      }
    }
  }
}
