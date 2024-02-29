import axios from 'axios';
import { notification, Icon } from 'antd';
// 作用: 匹配url和params中的关系
import * as pathToRegexp from 'path-to-regexp';
// 配置的拦截器
import './interceptors';

// 获取service中的拼装函数
import { getAPIByName } from '@/config/api.config';

axios.defaults.withCredentials = true;
// axios.defaults.withCredentials = false;
axios.defaults.crossDomain = true;

// 默认的Axios的配置
// eslint-disable-next-line no-unused-vars
const defaultAxiosConfig = {
  // 默认直接params和body重置为空
  params: {},
  data: {},
  changeOrigin: true, // 允许跨域
  withCredentials: true,
};
export const baseURL = 'http://localhost:8000/api';

// 对于'Method Api'的方式进行拆分
function urlParse(params) {
  const result = params.split(' ');
  const method = result[0].toLowerCase();
  if (result[1].includes('http' || 'https')) {
    return [method, result[1]];
  }
  const url = `${baseURL}${result[1]}`;
  return [method, url];
}

// 按照不同的method整理对应的params
function pathToRegexpUrlAndAPI(url, params) {
  const result = pathToRegexp.compile(url)(params);
  return result;
}

function makeAxiosOptions(options) {
  const {
    name, queryParams,
    url: requestUrl,
  } = options;
  let { data = null, params = null} = options;
  let url = '';
  let method = 'get';
  if (
    getAPIByName(name).includes('https') ||
    getAPIByName(name).includes('http')
  ) {
    [method, url] = urlParse(getAPIByName(name));
  } else {
    [method, url] = urlParse(pathToRegexpUrlAndAPI(getAPIByName(name), params));
  }
  const axiosOptions = {
    url,
    method,
    data,
  };

  // 设置查询字符串
  if (!queryParams || Object.keys(queryParams).length === 0) {
    axiosOptions.params = {};
  } else {
    axiosOptions.params = queryParams;
  }

  const result = { ...defaultAxiosConfig, ...axiosOptions };
  return result;
}

function request(name, options) {
  let use = {};
  if (!options) {
    use = { name };
  } else {
    use = { ...options, name };
  }
  const axiosOptions = makeAxiosOptions(use);
  // 发送请求
  return axios(axiosOptions)
    .then((res) => {
      if (res.status === 200 || res.status === 304) {
        return res.data;
      }
    })
    .catch((errorInfo) => {
      console.log('---- 抓住了错误 errorInfo = ', errorInfo);
      throw errorInfo;
    });
}

// 暴露当前的request的方法
export default request;
