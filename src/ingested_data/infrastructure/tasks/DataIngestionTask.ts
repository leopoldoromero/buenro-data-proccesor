import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataIngestor } from 'src/ingested_data/application/data_ingestor/DataIngestor.service';

@Injectable()
export class DataIngestionTask {
  constructor(private readonly dataIngestor: DataIngestor) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async handleCron() {
    return this.dataIngestor.execute();
  }
}
