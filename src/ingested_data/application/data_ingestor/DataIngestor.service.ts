import { Inject, Injectable, Logger } from '@nestjs/common';
import { IngestedData } from 'src/ingested_data/domain/IngestedData';
import { IngestedDataRepository } from 'src/ingested_data/domain/IngestedDataRepository';
import { DataSourceProvider } from 'src/ingested_data/domain/DataSourceProvider';

@Injectable()
export class DataIngestor {
  private readonly logger = new Logger(DataIngestor.name);
  constructor(
    @Inject('IngestedDataMongoRepository')
    private readonly repository: IngestedDataRepository,
    @Inject('DATA_SOURCE_PROVIDERS')
    private readonly providers: DataSourceProvider[],
  ) {}

  async execute(): Promise<void> {
    this.logger.log('Running data ingestion cron job...');

    const BATCH_SIZE = 100;

    for (const provider of this.providers) {
      this.logger.log(`Ingesting data from ${provider.name}...`);
      let batch: IngestedData[] = [];

      try {
        for await (const item of provider.fetch()) {
          batch.push(item);
          if (batch.length >= BATCH_SIZE) {
            await this.repository.persistMany(batch);
            batch = [];
          }
        }

        if (batch.length > 0) {
          await this.repository.persistMany(batch);
        }

        this.logger.log(`Finished ingesting from ${provider.name}`);
      } catch (error) {
        this.logger.error(`Error while ingesting from ${provider.name}`, error);
      }
    }
  }
}
