/**
 * 判断是否中文名
 */
export function isChineseName(value) {
  return Boolean(value) && /^[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF·•]{2,20}$/.test(value);
}

/**
 * 判断是否身份证
 */
export function isIdentityNumber(value) {
  return (
    Boolean(value) &&
    /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)
  );
}

/**
 * 判断是否邮箱
 */
export function isEmail(value) {
  return Boolean(value) && /^[.a-zA-Z0-9_-]+@[.a-zA-Z0-9_-]+(\.[a-zA-Z]{2,8})$/.test(value);
}

/**
 * 判断是否手机号
 */
export function isPhoneNumber(value) {
  return Boolean(value) && /^1\d{10}$/.test(value);
}

/**
 * 判断邮政编码
 */
export function isPostCode(value) {
  return Boolean(value) && /^\d{6}$/.test(value);
}

/**
 * 判断短信验证码
 */
export function isSmsCode(value) {
  return Boolean(value) && /^\d{6}$/.test(value);
}

/**
 * 判断贷款金额1-500正整数
 */
export function isLoanAmount(value) {
  return Boolean(value) && /(^[1-4][0-9]{1,2}$)|(^[1-9]$)|500|50/.test(value);
}

/**
 * 判断图形验证码
 */
export function isCaptureCode(value) {
  return Boolean(value) && /^[A-Za-z0-9]{4}$/.test(value);
}

/**
 * 判断车牌号
 */
export function isCarNo(value) {
  return Boolean(value) && /^[A-Za-z0-9]{6,7}$/.test(value);
}

export const regxs = {
  /**
   * 中文名
   */
  cnName: /^[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF·•]{2,20}$/,
  /**
   * 身份证
   */
  identityNumber: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,
  /**
   * 邮箱
   */
  email: /^[.a-zA-Z0-9_-]+@[.a-zA-Z0-9_-]+(\.[a-zA-Z]{2,8})$/,
};

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
