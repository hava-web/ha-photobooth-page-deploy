import { isNumber, isNaN as isNaNLodash } from 'lodash';

function isNumberable(num: number | string): boolean {
  return num === 0 || (!!num && isNumber(+num) && !isNaNLodash(+num));
}

export { isNumberable };
