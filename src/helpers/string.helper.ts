import { toString } from 'lodash';

function convertViToEn(str: string, toUpperCase = false) {
  if (typeof str !== 'string') return '';
  const newStr = str
    .toLowerCase()
    .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    .replace(/đ/g, 'd')
    // Some system encode vietnamese combining accent as individual utf-8 characters
    .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
    .replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư

  return toUpperCase ? newStr.toUpperCase() : newStr;
}

/**
 * So chuỗi với số
 *
 * @category string, number
 * @param any types to compare
 * @param any types to compare
 * @returns Returns boolean of compare.
 * @example
 *
 * isEqualVal(1, "1") => true
 * isEqualVal(0, "0") => true
 * isEqualVal(0, "") => false
 * isEqualVal(0, "") => false
 * isEqualVal(1, "abc") => false
 * isEqualVal("abc", "abc") => true
 *
 */
function isEqualVal(
  v1: string | number | null,
  v2: string | number | null,
): boolean {
  return !!toString(v1) && toString(v1) === toString(v2);
}

export { convertViToEn, isEqualVal };
