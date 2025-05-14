import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IngestedData } from 'src/ingested_data/domain/IngestedData';
import { DataSourceHttpJson } from './DataSourceHttpJson';

export type DataSourcePrivderAResponseDto = {
  id: number;
  name: string;
  address: {
    country: string;
    city: string;
  };
  isAvailable: boolean;
  priceForNight: number;
};

@Injectable()
export class DataSourceHttpProviderStructured extends DataSourceHttpJson {
  readonly name = 'DATA_SOURCE_PROVIDER_STRUCTURED';
  url = this.configService.get('PROVIDER_STRUCTURED_URL');
  constructor(private readonly configService: ConfigService) {
    super();
  }

  dtoToDomain(
    source: string,
    value: DataSourcePrivderAResponseDto,
  ): IngestedData {
    return new IngestedData({
      id: typeof value.id === 'number' ? String(value.id) : value.id,
      name: value?.name,
      city: value?.address.city,
      country: value?.address?.country,
      isAvailable: value?.isAvailable,
      pricePerNight: value?.priceForNight,
      source,
      ingestedAt: new Date(),
    });
  }
}
