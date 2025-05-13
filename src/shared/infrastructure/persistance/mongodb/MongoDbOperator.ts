import { OperatorTypes } from 'src/shared/domain/criteria/CriteriaFilterOperator';
import { InvalidArgumentError } from 'src/shared/domain/errors/InvalidArgumentError';

export enum MongoDbOperatorValues {
  EQUAL = '$eq',
  NOT_EQUAL = '$ne',
  GT = '$gt',
  LT = '$lt',
  GT_EQUAL = '$gte',
  LT_EQUAL = '$lte',
  CONTAINS = '$in',
  NOT_CONTAINS = '$nin',
  LIKE = '$regex',
}

export class MongoDbOperator {
  constructor(public value: MongoDbOperatorValues) {
    this.checkValueIsValid(value, Object.values(MongoDbOperatorValues));
  }

  public checkValueIsValid(
    value: MongoDbOperatorValues,
    validValues: MongoDbOperatorValues[],
  ): void {
    if (!validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  static create(value: OperatorTypes) {
    switch (value) {
      case OperatorTypes.CONTAINS:
        return new MongoDbOperator(MongoDbOperatorValues.CONTAINS);
      case OperatorTypes.EQUAL:
        return new MongoDbOperator(MongoDbOperatorValues.EQUAL);
      case OperatorTypes.NOT_EQUAL:
        return new MongoDbOperator(MongoDbOperatorValues.NOT_EQUAL);
      case OperatorTypes.GT:
        return new MongoDbOperator(MongoDbOperatorValues.GT);
      case OperatorTypes.LT:
        return new MongoDbOperator(MongoDbOperatorValues.LT);
      case OperatorTypes.NOT_CONTAINS:
        return new MongoDbOperator(MongoDbOperatorValues.NOT_CONTAINS);
      case OperatorTypes.GT_EQUAL:
        return new MongoDbOperator(MongoDbOperatorValues.GT_EQUAL);
      case OperatorTypes.LT_EQUAL:
        return new MongoDbOperator(MongoDbOperatorValues.LT_EQUAL);
      case OperatorTypes.LIKE:
        return new MongoDbOperator(MongoDbOperatorValues.LIKE);
      default:
        throw new InvalidArgumentError(`The operator ${value} is invalid`);
    }
  }

  private throwErrorForInvalidValue(value: MongoDbOperatorValues): void {
    throw new InvalidArgumentError(`The operator ${value} is invalid`);
  }
}
