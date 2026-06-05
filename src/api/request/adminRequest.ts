import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { TIME_OUT_API } from 'constants/api.const';
import downloadI18n from 'i18n/download';

type ApiErrorPayload = {
  code?: number;
  errors?: Array<{
    errorMessage?: string;
  }>;
  message?: string;
  [key: string]: any;
};

const adminRequest: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: TIME_OUT_API,
});

function isHandledApiError(payload: unknown): payload is ApiErrorPayload {
  if (!payload || typeof payload !== 'object') return false;

  const code = (payload as ApiErrorPayload).code;
  return typeof code === 'number' && code >= 400 && code <= 500;
}

function getApiErrorMessage(payload: ApiErrorPayload) {
  return payload?.errors?.[0]?.errorMessage || payload?.message;
}

adminRequest.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const language = downloadI18n.language || 'vi';

  config.headers.set('F-Accept-Language', language);

  return config;
});

adminRequest.interceptors.response.use((response: AxiosResponse) => {
  const responseData = response?.data;

  if (isHandledApiError(responseData)) {
    throw Object.assign(responseData ?? {}, {
      message: getApiErrorMessage(responseData),
    });
  }

  return responseData;
});

export function apiGet<Response>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<Response> {
  return adminRequest.get<Response, Response>(url, config);
}

export function apiPost<Response, Payload = unknown>(
  url: string,
  payload?: Payload,
  config?: AxiosRequestConfig<Payload>,
): Promise<Response> {
  return adminRequest.post<Response, Response, Payload>(url, payload, config);
}

export default adminRequest;
