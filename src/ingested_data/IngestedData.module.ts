import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import {
  IngestedDataDocumentSchema,
  IngestedDataMongoSchema,
} from './infrastructure/persistance/IngestedDataDbSchema';
import { IngestedDataMongoRepository } from './infrastructure/persistance/IngestedDataMongoDbRepository';
import { DataIngestionTask } from './infrastructure/tasks/DataIngestionTask';
import { ConfigModule } from '@nestjs/config';
import { IngestedDataFinder } from './application/ingested_data_finder/IngestedDataFinder.service';
import { GetIngestedDataController } from './infrastructure/controllers/v1/get_ingested_data/GetIngestedData.controller';
import { DataIngestor } from './application/data_ingestor/DataIngestor.service';
import { DataSourceHttpProviderStructured } from './infrastructure/http/DataSourceHttpProviderStructured';
import { DataSourceHttpProviderLarge } from './infrastructure/http/DataSourceHttpProviderLarge';
import { DataSourceProvider } from './domain/DataSourceProvider';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: IngestedDataDocumentSchema.modelName,
        schema: IngestedDataMongoSchema,
      },
    ]),
    ConfigModule,
  ],
  providers: [
    {
      provide: 'IngestedDataMongoRepository',
      useClass: IngestedDataMongoRepository,
    },
    DataSourceHttpProviderStructured,
    DataSourceHttpProviderLarge,
    {
      provide: 'DATA_SOURCE_PROVIDERS',
      useFactory: (
        providerA: DataSourceHttpProviderStructured,
        providerB: DataSourceHttpProviderLarge,
      ): DataSourceProvider[] => {
        return [providerA, providerB];
      },
      inject: [DataSourceHttpProviderStructured, DataSourceHttpProviderLarge],
    },
    IngestedDataDocumentSchema,
    IngestedDataMongoRepository,
    DataIngestionTask,
    IngestedDataFinder,
    DataIngestor,
  ],
  exports: [IngestedDataMongoRepository, DataIngestor],
  controllers: [GetIngestedDataController],
})
export class IngestedDataModule {}
