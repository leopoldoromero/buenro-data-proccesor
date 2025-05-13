import { Inject, Injectable } from '@nestjs/common';
import { IngestedData } from 'src/ingested_data/domain/IngestedData';
import { IngestedDataRepository } from 'src/ingested_data/domain/IngestedDataRepository';
import { Criteria } from 'src/shared/domain/criteria/Criteria';

@Injectable()
export class IngestedDataFinder {
  constructor(
    @Inject('IngestedDataMongoRepository')
    private readonly repository: IngestedDataRepository,
  ) {}

  async execute(criteria?: Criteria): Promise<Array<IngestedData>> {
    return this.repository.findAllByCriteria(criteria);
  }
}
