import request from '../request';
import { ITestServiceRes } from './api.type';

interface ITestServiceGetParams {
  s: string;
  b: string;
}
export const testServiceGet = (params: ITestServiceGetParams) => {
  return request<ITestServiceRes>({ url: '/test/xxx', method: 'get', params });
};

const basicApi = {
  testServiceGet,
};
export default basicApi;
