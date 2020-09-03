import { HttpClient } from '@angular/common/http';
import { THeaders } from './feed-net-http-typings';

export abstract class FeedNetHttpClient {
  constructor(protected http: HttpClient) {}

  getBaseUrl(): string {
    return '';
  }

  getDefaultHeaders(): THeaders {
    return {} as THeaders;
  }
}
