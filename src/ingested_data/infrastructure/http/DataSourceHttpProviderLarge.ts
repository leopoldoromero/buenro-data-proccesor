import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IngestedData } from 'src/ingested_data/domain/IngestedData';
import { DataSourceHttpJson } from './DataSourceHttpJson';

export type DataSourcePrivderBResponseDto = {
  id: number;
  city: string;
  availability: boolean;
  priceSegment: string;
  pricePerNight: number;
};

@Injectable()
export class DataSourceHttpProviderLarge extends DataSourceHttpJson {
  readonly name = 'DATA_SOURCE_PROVIDER_LARGE';
  url = this.configService.get('PROVIDER_LARGE_URL');
  constructor(private readonly configService: ConfigService) {
    super();
  }

  dtoToDomain(
    source: string,
    value: DataSourcePrivderBResponseDto,
  ): IngestedData {
    return new IngestedData({
      id: typeof value.id === 'number' ? String(value.id) : value.id,
      city: value?.city,
      isAvailable: value?.availability,
      pricePerNight: value?.pricePerNight,
      source,
      ingestedAt: new Date(),
    });
  }
}
