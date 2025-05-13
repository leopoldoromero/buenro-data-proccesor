import { InvalidArgumentError } from '../errors/InvalidArgumentError';

export enum CriteriaOrderTypes {
  ASC = 'ASC',
  DESC = 'DESC',
  NONE = 'NONE',
}

export class CriteriaOrderType {
  constructor(public value: CriteriaOrderTypes) {
    this.checkValueIsValid(value, Object.values(CriteriaOrderTypes));
  }

  public checkValueIsValid(
    value: CriteriaOrderTypes,
    validValues: CriteriaOrderTypes[],
  ): void {
    if (!validValues.includes(value)) {
      this.throwErrorForInvalidValue(value);
    }
  }

  static fromValue(value: string): CriteriaOrderType {
    switch (value) {
      case CriteriaOrderTypes.ASC:
        return new CriteriaOrderType(CriteriaOrderTypes.ASC);
      case CriteriaOrderTypes.DESC:
        return new CriteriaOrderType(CriteriaOrderTypes.DESC);
      default:
        throw new InvalidArgumentError(`The order type ${value} is invalid`);
    }
  }

  public isNone(): boolean {
    return this.value === CriteriaOrderTypes.NONE;
  }

  public isAsc(): boolean {
    return this.value === CriteriaOrderTypes.ASC;
  }

  private throwErrorForInvalidValue(value: CriteriaOrderTypes): void {
    throw new InvalidArgumentError(`The order type ${value} is invalid`);
  }
}
