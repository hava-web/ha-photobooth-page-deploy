import { reduce } from 'lodash';
import qs from 'query-string';

/**
 * Xử lý dữ liệu payload trước khi call api
 *
 * @category Object
 * @param object
 * @returns Returns string.
 * @example
 * { a: 1, b: 20 } => a=1&b=20
 *
 */
function preprocessGetQuery(payload: any = {}) {
  return qs.stringify(
    reduce(
      payload,
      (stackPayload, item, key) => ({
        ...stackPayload,
        [key]: item,
      }),
      payload,
    ),
  );
}

export { preprocessGetQuery };
