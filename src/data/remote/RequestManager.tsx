import {handleErrorIfNeeded} from '../../utils/APIErrorHandling';
import {prettyPrintResponse} from '../../utils/Extras';
import {BASE_URL} from '../../utils/Config';

export interface BaseRequestModel {
  url: string;
  rawUrl: boolean;
  domain?: string;
  method?: 'GET' | 'PUT' | 'PATCH' | 'DELETE' | 'POST';
  params?: object;
  headers?: object;
  encoding?: 'json' | 'multipart' | 'url';
  authorized?: boolean;
}

const createQueryParams = (params: any) =>
  Object.keys(params)
    .map(k => `${k}=${encodeURI(params[k])}`)
    .join('&');

export async function sendRequest<T>(
  model: BaseRequestModel,
  signal?: AbortSignal,
): Promise<T> {
  let method = model.method ?? 'GET';
  let params = model.params ?? {};
  let headers = model.headers ?? {};
  let allowToSendBody = !(
    method.toUpperCase() === 'GET' || method.toUpperCase() === 'HEAD'
  );
  let encoding = model.encoding ?? 'json';
  let url = model.rawUrl ? model.url : `${BASE_URL}${model.url}`;

  console.log(model.rawUrl);
  console.log(url);
  let body = null;

  switch (encoding) {
    case 'url': {
      let queryParams = createQueryParams(params);
      url = `${url}?${queryParams}`;
      break;
    }
    case 'multipart': {
      let formData = new FormData();
      Object.keys(params).forEach(key => {
        // @ts-ignore
        formData.append(key, params[key]);
      });

      console.log('Form data = ', formData);
      body = formData;
      break;
    }
    default: {
      body = JSON.stringify(params);
    }
  }

  let request = await fetch(url, {
    method: method,
    headers: {
      ...headers,
    },
    body: allowToSendBody ? body : null,
    signal: signal,
  });

  const response = await request.json();

  await prettyPrintResponse(request, response);

  await handleErrorIfNeeded(request.status, response);

  return response;
}
