import axios, { AxiosRequestConfig } from 'axios';
const baseURL = '/api';

const instance = axios.create({
  // xsrfCookieName: 'xsrf-token',
  baseURL,
});
export interface IRequestRes<T> {
  code: EResponseCode;
  data: T;
  msg: string;
}
export enum EResponseCode {
  SUCCESS = '00000',
  ERROR = 'A0500',
  NOT_FOUND = '404',
  PARAMETER_ERROR = 'A0400',
  PARAMETER_FORMAT_ERROR = 'A0421',
  USER_RESOURCE = 'A0600',
  USER_AUTHENTICATION_FAILED = 'A0220',
  USER_LOGIN_EXPIRED = 'A0230',
  USER_ACCOUNT_NOT_EXIST = 'A0201',
}
export enum EBasicResponseCode {
  SUCCESS = '200',
  Created = '201',
  RqeuestError = '400',
  NO_LOGIN = '401',
  UnAccess = '403',
  NotFound = '404',
  Invalid = '406',
  Removed = '410',
  ValidationError = '422',
  SevericeError = '500',
  GatewayError = '502',
  Timeout = '504',
  PAW_ERROR = '20002'
}
/** 根据isNotMoveEmptyString是否删除 key='' 的参数 并去除get请求的url缓存   */
const removeEmptyParam = (config: AxiosRequestConfig & { isNotMoveEmptyString?: boolean }) => {
  if (config.url && config.url.startsWith('/')) {
    config.url = config.url.slice(1);
  }
  if (config.params && !config.isNotMoveEmptyString) {
    for (const key in config.params) {
      if (config.params[key] === '') delete config.params[key];
    }
  }
  if (config.method === 'get') {
    const $q = /\?/.test(config.url as string) ? '&' : '?';
    config.url += $q + `t=${Date.now()}`;
  }
  return config;
};

instance.interceptors.request.use(
  removeEmptyParam,
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // todo response success
    return response.data;
  }, (error) => {
    // todo response success
    return Promise.reject(error);
  }
);

/** 默认使用http状态码的请求的泛型  要自定义响应状态码可用注释掉的那一行 */
const request = async <T>(config: AxiosRequestConfig & { isNotMoveEmptyString?: boolean }) => {
  // return instance.request<IRequestRes<T>>({ ...config })
  return instance.request<T>({ ...config })
    .then((res) => res.data);
};

export default request;