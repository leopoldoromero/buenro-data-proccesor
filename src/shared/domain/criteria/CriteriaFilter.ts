import { InvalidArgumentError } from '../errors/InvalidArgumentError';
import { CriteriaFilterField } from './CriteriaFilterField';
import {
  CriteriaFilterOperator,
  OperatorTypes,
} from './CriteriaFilterOperator';
import { CriteriaFilterValue } from './CriteriaFilterValue';

export interface CriteriaFilterProps {
  field: string;
  value: string;
  operator?: string;
}

export class CriteriaFilter {
  readonly field: CriteriaFilterField;
  readonly operator: CriteriaFilterOperator;
  readonly value: CriteriaFilterValue;

  constructor(
    field: CriteriaFilterField,
    value: CriteriaFilterValue,
    operator?: CriteriaFilterOperator,
  ) {
    this.field = field;
    this.operator = operator ?? new CriteriaFilterOperator(OperatorTypes.EQUAL);
    this.value = value;
  }

  static fromValues(values: CriteriaFilterProps): CriteriaFilter {
    const field = values?.field;
    const operator = values?.operator;
    const value = values?.value;

    if (!field || !value) {
      throw new InvalidArgumentError(`The CriteriaFilter is invalid`);
    }

    return new CriteriaFilter(
      new CriteriaFilterField(field),
      new CriteriaFilterValue(value),
      CriteriaFilterOperator.fromValue(operator ?? 'EQUAL'),
    );
  }
}
