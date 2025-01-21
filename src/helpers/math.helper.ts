import { isNumber, isNaN as isNaNLodash, size } from 'lodash';

function isNumberable(num: number | string): boolean {
  return num === 0 || (!!num && isNumber(+num) && !isNaNLodash(+num));
}

function sortBySizeOfItem(data: { [key: string]: Array<any> }): {
  [key: string]: Array<any>;
} {
  const sortedArray = Object.entries(data).sort(
    (a, b) => size(b[1]) - size(a[1]),
  );

  return Object.fromEntries(sortedArray);
}

export { isNumberable, sortBySizeOfItem };
