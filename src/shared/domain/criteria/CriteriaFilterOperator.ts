import { InvalidArgumentError } from '../errors/InvalidArgumentError';

export enum OperatorTypes {
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  GT = 'GT',
  LT = 'LT',
  GT_EQUAL = 'GT_EQUAL',
  LT_EQUAL = 'LT_EQUAL',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
  LIKE = 'LIKE',
}

export class CriteriaFilterOperator {
  constructor(public value: OperatorTypes) {
    this.checkValueIsValid(value, Object.values(OperatorTypes));
  }

  public checkValueIsValid(
    value: OperatorTypes,
    validValues: OperatorTypes[],
  ): void {
    if (!validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  static fromValue(value: string): CriteriaFilterOperator {
    switch (value) {
      case OperatorTypes.CONTAINS:
        return new CriteriaFilterOperator(OperatorTypes.CONTAINS);
      case OperatorTypes.EQUAL:
        return new CriteriaFilterOperator(OperatorTypes.EQUAL);
      case OperatorTypes.NOT_EQUAL:
        return new CriteriaFilterOperator(OperatorTypes.NOT_EQUAL);
      case OperatorTypes.GT:
        return new CriteriaFilterOperator(OperatorTypes.GT);
      case OperatorTypes.LT:
        return new CriteriaFilterOperator(OperatorTypes.LT);
      case OperatorTypes.NOT_CONTAINS:
        return new CriteriaFilterOperator(OperatorTypes.NOT_CONTAINS);
      case OperatorTypes.GT_EQUAL:
        return new CriteriaFilterOperator(OperatorTypes.GT_EQUAL);
      case OperatorTypes.LT_EQUAL:
        return new CriteriaFilterOperator(OperatorTypes.LT_EQUAL);
      case OperatorTypes.LIKE:
        return new CriteriaFilterOperator(OperatorTypes.LIKE);
      default:
        throw new InvalidArgumentError(`The operator ${value} is invalid`);
    }
  }

  protected throwErrorForInvalidValue(value: OperatorTypes): void {
    throw new InvalidArgumentError(`The operator ${value} is invalid`);
  }
}
