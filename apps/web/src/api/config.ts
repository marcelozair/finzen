import {
  AxiosParams,
  CallbackParams,
  AxiosCustomRequest,
  AxiosQuery,
} from './config.interface';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAuthorizationToken } from '../helpers/authorization';

const API_URL = import.meta.env.VITE_API_URL;

const processBody = (response: AxiosResponse) => response.data;

const addParams = (url: string, params: AxiosParams) => {
  let urlResult = url;

  for (const key in params) {
    urlResult = urlResult.replace(`:${key}`, String(params[key]));
  }

  return urlResult;
};

const addQuery = (url: string, query: AxiosQuery) => {
  let urlResult = `${url}?`;

  for (const key in query) {
    urlResult += key + "=" + encodeURIComponent(query[key]);
  }

  return urlResult;
};

const axiosCallBack = (
  url: string,
  config?: AxiosCustomRequest
): CallbackParams => {
  let apiUrl = url;
  let apiPaylaod: any = {};

  if (!config) return [apiUrl, undefined];

  if (config.params) apiUrl = addParams(apiUrl, config.params);
  if (config.query) apiUrl = addQuery(apiUrl, config.query);
  if (config.data) apiPaylaod = config.data;

  return [apiUrl, apiPaylaod];
};

export const $api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json',
  },
});

export const $axios = {
  get: (url: string, config?: AxiosCustomRequest) => {
    const [URL, payload] = axiosCallBack(url, config);
    return $api.get(URL, payload).then(processBody);
  },
  post: (url: string, config?: AxiosCustomRequest) => {
    const [URL, payload] = axiosCallBack(url, config);
    return $api.post(URL, payload).then(processBody);
  },
};

export const addAxiosAuthorization = () => {
  const authorization = getAuthorizationToken();

  if (authorization) {
    $api.defaults.headers.common.Authorization = authorization;
  }
};
