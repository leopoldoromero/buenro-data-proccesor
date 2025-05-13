import { Criteria } from 'src/shared/domain/criteria/Criteria';
import { IngestedData } from './IngestedData';

export interface IngestedDataRepository {
  persist(ingestedData: IngestedData): Promise<void>;
  findAllByCriteria(criteria?: Criteria): Promise<Array<IngestedData>>;
  persistMany(data: Array<IngestedData>): Promise<void>;
}
