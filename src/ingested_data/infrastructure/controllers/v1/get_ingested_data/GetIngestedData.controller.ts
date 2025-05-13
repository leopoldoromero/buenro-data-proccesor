import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetIngestedDataResponse } from './GetIngestedDataResponse';
import { IngestedDataFinder } from 'src/ingested_data/application/ingested_data_finder/IngestedDataFinder.service';
import { queryParamsToCriteriaMapper } from 'src/ingested_data/application/mappers/queryParamsToCriteriaMapper';
import { Criteria } from 'src/shared/domain/criteria/Criteria';

@ApiTags('ingested-data')
@Controller('/api/v1/ingested-data')
export class GetIngestedDataController {
  constructor(private readonly dataFinder: IngestedDataFinder) {}

  @Get('/')
  @ApiOperation({ summary: 'List document categories with their types' })
  @ApiResponse({
    status: 200,
    description: 'List of categories with their types',
    type: [GetIngestedDataResponse],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async run(
    @Query() queryParams: Record<string, any>,
  ): Promise<GetIngestedDataResponse[]> {
    const queryString = this.queryStringGenerator(queryParams);
    const criteria: Criteria = queryParamsToCriteriaMapper(queryString);
    const data = await this.dataFinder.execute(criteria);
    return data.map((el) => new GetIngestedDataResponse(el));
  }

  private queryStringGenerator(queryParams: Record<string, any>): string {
    const urlSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParams)) {
      if (Array.isArray(value)) {
        value.forEach((v) => urlSearchParams.append(key, v));
      } else {
        urlSearchParams.append(key, value);
      }
    }
    return urlSearchParams.toString();
  }
}
