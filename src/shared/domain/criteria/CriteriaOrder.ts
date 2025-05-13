import { CriteriaOrderBy } from './CriteriaOrderBy';
import { CriteriaOrderType, CriteriaOrderTypes } from './CriteriaOrderType';

export class CriteriaOrder {
  constructor(
    readonly orderBy: CriteriaOrderBy,
    readonly orderType: CriteriaOrderType,
  ) {}

  static fromValues(orderBy?: string, orderType?: string): CriteriaOrder {
    if (!orderBy) {
      return CriteriaOrder.none();
    }

    return new CriteriaOrder(
      new CriteriaOrderBy(orderBy),
      CriteriaOrderType.fromValue(orderType || CriteriaOrderTypes.ASC),
    );
  }

  static none(): CriteriaOrder {
    return new CriteriaOrder(
      new CriteriaOrderBy(''),
      new CriteriaOrderType(CriteriaOrderTypes.NONE),
    );
  }

  static desc(orderBy: string): CriteriaOrder {
    return new CriteriaOrder(
      new CriteriaOrderBy(orderBy),
      new CriteriaOrderType(CriteriaOrderTypes.DESC),
    );
  }

  static asc(orderBy: string): CriteriaOrder {
    return new CriteriaOrder(
      new CriteriaOrderBy(orderBy),
      new CriteriaOrderType(CriteriaOrderTypes.ASC),
    );
  }

  public hasCriteriaOrder() {
    return !this.orderType.isNone();
  }
}
