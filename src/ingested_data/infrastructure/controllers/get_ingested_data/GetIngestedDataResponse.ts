import { ApiProperty } from '@nestjs/swagger';
import { IngestedData } from 'src/ingested_data/domain/IngestedData';

export class GetIngestedDataResponse {
  @ApiProperty({
    description: 'The unique identifier of the element',
    example: 123456,
  })
  id: number;
  @ApiProperty({
    description: 'The name of the human',
    nullable: true,
    example: 'Pepito',
  })
  name?: string;
  @ApiProperty({ description: 'The name of the city', example: 'Madrid' })
  city: string;
  @ApiProperty({
    description: 'The name of the country',
    nullable: true,
    example: 'Spain',
  })
  country?: string;
  @ApiProperty({ description: 'Availability', example: true })
  isAvailable: boolean;
  @ApiProperty({
    description: 'one of high/medium/low',
    nullable: true,
    example: 'low',
  })
  priceSegment?: string;
  @ApiProperty({
    description: 'prive per night (any digit between 100 and 1000)',
    nullable: true,
    example: 100,
  })
  pricePerNight: number;

  constructor(data: IngestedData) {
    this.id = data.getProp('id');
    this.name = data.getProp('name');
    this.city = data.getProp('city');
    this.country = data.getProp('country');
    this.isAvailable = data.getProp('isAvailable');
    this.priceSegment = data.getProp('priceSegment') ?? null;
    this.pricePerNight = data.getProp('pricePerNight');
  }
}
