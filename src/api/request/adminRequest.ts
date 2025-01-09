import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { TIME_OUT_API } from 'constants/api.const';

const adminRequest: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: TIME_OUT_API,
});

adminRequest.interceptors.response.use((response: AxiosResponse) => {
  if (response?.data?.code >= 400 && response?.data?.code <= 500) {
    throw Object.assign(response?.data ?? {}, {
      message:
        response?.data?.errors?.[0]?.errorMessage || response?.data?.message,
    });
  }
  return response?.data;
});

export default adminRequest;
