import { InvalidArgumentError } from 'src/shared/domain/errors/InvalidArgumentError';
import { CriteriaOrderTypes } from '../../../domain/criteria/CriteriaOrderType';

enum MongoDbOrderTypeValues {
  ASC = '1',
  DESC = '-1',
}

export class MongoDbOrderType {
  private constructor(public value: MongoDbOrderTypeValues) {
    this.checkValueIsValid(value, Object.values(MongoDbOrderTypeValues));
  }

  public checkValueIsValid(
    value: MongoDbOrderTypeValues,
    validValues: MongoDbOrderTypeValues[],
  ): void {
    if (!validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  static create(value: CriteriaOrderTypes) {
    switch (value) {
      case CriteriaOrderTypes.ASC:
        return new MongoDbOrderType(MongoDbOrderTypeValues.ASC);
      case CriteriaOrderTypes.DESC:
        return new MongoDbOrderType(MongoDbOrderTypeValues.DESC);
      case CriteriaOrderTypes.NONE:
        return new MongoDbOrderType(MongoDbOrderTypeValues.DESC);
      default:
        throw new InvalidArgumentError(`The operator ${value} is invalid`);
    }
  }

  protected throwErrorForInvalidValue(value: MongoDbOrderTypeValues): void {
    throw new InvalidArgumentError(`The operator ${value} is invalid`);
  }
}
