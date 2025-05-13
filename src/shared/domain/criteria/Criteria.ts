import { CriteriaFilter } from './CriteriaFilter';
import { CriteriaOrder } from './CriteriaOrder';

export class Criteria {
  constructor(
    readonly filters: Array<CriteriaFilter>,
    readonly order?: Array<CriteriaOrder>,
    readonly page?: number,
    readonly limit?: number,
  ) {}
}
