import { Criteria } from '../../../shared/domain/criteria/Criteria';
import { CriteriaFilter } from '../../../shared/domain/criteria/CriteriaFilter';
import { CriteriaFilterField } from '../../../shared/domain/criteria/CriteriaFilterField';
import {
  CriteriaFilterOperator,
  OperatorTypes,
} from '../../../shared/domain/criteria/CriteriaFilterOperator';
import { CriteriaFilterValue } from '../../../shared/domain/criteria/CriteriaFilterValue';
import { CriteriaOrder } from '../../../shared/domain/criteria/CriteriaOrder';
import { CriteriaOrderBy } from '../../../shared/domain/criteria/CriteriaOrderBy';
import { CriteriaOrderType } from '../../../shared/domain/criteria/CriteriaOrderType';

export interface QueryParam {
  field: string;
  value: string | string[];
  operator: string;
}

export function queryParamsMapper(queryParams: URLSearchParams): QueryParam[] {
  const filtersMap: Record<number, Partial<QueryParam>> = {};

  for (const [key, value] of queryParams.entries()) {
    const match = key.match(/^filters\[(\d+)]\[(field|operator|value)]$/);
    if (match) {
      const index = parseInt(match[1], 10);
      const prop = match[2] as keyof QueryParam;
      if (!filtersMap[index])
        filtersMap[index] = { field: '', operator: '', value: '' };

      if (prop === 'value') {
        filtersMap[index].value = value.includes('|')
          ? value.split('|')
          : value;
      } else {
        filtersMap[index][prop] = value;
      }
    }
  }

  return Object.values(filtersMap) as QueryParam[];
}

const filtersToCriteriaFilters = (
  queryParams: URLSearchParams,
): CriteriaFilter[] => {
  const queryParamsMap = queryParamsMapper(queryParams);

  return queryParamsMap.map((queryParam) => {
    return new CriteriaFilter(
      new CriteriaFilterField(queryParam.field),
      new CriteriaFilterValue(queryParam.value),
      CriteriaFilterOperator.fromValue(queryParam.operator) ??
        new CriteriaFilterOperator(OperatorTypes.EQUAL),
    );
  });
};

const sortToCriteriaOrder = (sort?: string): CriteriaOrder[] => {
  if (!sort) return [];
  return sort.split(',').map((sortParam) => {
    const [field, orderType] = sortParam.split(':');
    return new CriteriaOrder(
      new CriteriaOrderBy(field),
      CriteriaOrderType.fromValue(orderType ?? 'ASC'),
    );
  });
};

export const queryParamsToCriteriaMapper = (queryString: string): Criteria => {
  const queryParams = new URLSearchParams(queryString);
  const criteriaFilters = filtersToCriteriaFilters(queryParams);
  const sort = queryParams.get('sort');
  const criteriaOrder = sortToCriteriaOrder(sort ?? '');
  const page = queryParams.get('page')
    ? Number(queryParams.get('page'))
    : undefined;
  const limit = queryParams.get('limit')
    ? Number(queryParams.get('limit'))
    : undefined;
  return new Criteria(criteriaFilters, criteriaOrder, page, limit);
};
