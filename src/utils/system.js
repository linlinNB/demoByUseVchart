import Taro from "@tarojs/taro";

/**
 * 作用: 计算当前页面最小高度，windowHeight - statusBarHeight, 否则直接100vh.
 * @returns {number}
 */
export const getPageMinHeight = () => {
  const {
    windowHeight,
    statusBarHeight,
  } = Taro.getSystemInfoSync();
  let pageMinHeight = '100vh';
  pageMinHeight = windowHeight - statusBarHeight;
  return pageMinHeight;

}
