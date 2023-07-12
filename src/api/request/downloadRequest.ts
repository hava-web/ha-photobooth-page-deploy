import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { TIME_OUT_API } from 'constants/api.const';

const downloadRequest: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_DOWNLOAD_FILE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-booth-client': 'tdb7ZS^)2$OP2bmO',
  },
  timeout: TIME_OUT_API,
});

downloadRequest.interceptors.response.use((response: AxiosResponse) => {
  if (response?.data?.code >= 400 && response?.data?.code <= 500) {
    throw Object.assign(response?.data ?? {}, {
      message:
        response?.data?.errors?.[0]?.errorMessage || response?.data?.message,
    });
  }
  return response?.data;
});

export default downloadRequest;
