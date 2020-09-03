/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { FeedNetHttpInterceptor } from './feed-net-http-typings';

@Injectable()
export class FeedNetHttpProvider {
  _interceptors: FeedNetHttpInterceptor[] = [];

  getInterceptors(): FeedNetHttpInterceptor[] {
    return this._interceptors;
  }

  addInterceptor(interceptor: FeedNetHttpInterceptor): this {
    this._interceptors.push(interceptor);
    return this;
  }

  addRequestInterceptor(interceptor: (req: HttpRequest<any>) => HttpRequest<any>): FeedNetHttpProvider {
    return this.addInterceptor({
      request: (request: HttpRequest<any>): HttpRequest<any> | void => interceptor(request) || request,
    });
  }

  addResponseInterceptor(interceptor: (res: any, req?: HttpRequest<any>) => any): FeedNetHttpProvider {
    return this.addInterceptor({
      response: (response: HttpEvent<any> | HttpErrorResponse, request?: HttpRequest<any>): HttpEvent<any> | void =>
        interceptor(response, request) || response,
    });
  }

  addResponseErrorInterceptor(interceptor: (res: any, req?: HttpRequest<any>) => any): FeedNetHttpProvider {
    return this.addInterceptor({
      response: (response: HttpEvent<any> | HttpErrorResponse, request?: HttpRequest<any>): HttpEvent<any> | void => {
        if (response instanceof HttpErrorResponse) {
          return interceptor(response, request) || response;
        }
      },
    });
  }

  /**
   * Simply handles all http requests
   *
   * @param {HttpRequest<any>} request
   * @returns {HttpRequest<any>}
   */
  requestHandler(request: HttpRequest<any>): HttpRequest<any> {
    return this._interceptors
      .filter((value) => !!value.request)
      .reduce((prev, current) => {
        return current.request?.(prev) || prev;
      }, request);
  }

  /**
   * Simply handles all http responses
   *
   * @param {HttpEvent<any>} response
   * @param {HttpRequest<any>} request
   * @returns {HttpEvent<any>}
   */
  responseHandler(response: HttpEvent<any>, request?: HttpRequest<any>): HttpEvent<any> {
    return this._interceptors
      .filter((value) => !!value.response)
      .reverse()
      .reduce((prev, current) => {
        return current.response?.(prev, request) || prev;
      }, response);
  }

  baseUrl(host: string, excludes: RegExp[] = []): FeedNetHttpProvider {
    this._interceptors.push({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        if (/^https?:/.test(request.url)) {
          return request;
        }

        const excludeUrl = excludes.some((t) => t.test(request.url));
        if (excludeUrl) {
          return request;
        }

        host = host.replace(/\/$/, '');
        const url = request.url.replace(/^\//, '');
        return request.clone({ url: `${host}/${url}` });
      },
    });

    return this;
  }

  headers(headers: { [name: string]: string | string[] } = {}, override = false): FeedNetHttpProvider {
    return this.addInterceptor({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        let result = headers;
        if (request.headers) {
          result = Object.keys(headers).reduce((obj, key) => {
            if (override || !request.headers.has(key)) {
              obj[key] = headers[key];
            }
            return obj;
          }, {} as any);
        }

        return request.clone({ setHeaders: result });
      },
    });
  }
}
