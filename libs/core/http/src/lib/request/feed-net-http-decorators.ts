/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */

import { HttpHeaders, HttpParams } from '@angular/common/http';
import { FeedNetHttpClient } from './feed-net-http-client';
import { isUndefined } from './utils';
import { MediaType } from './feed-net-http-typings';

/**
 * Class decorator
 *
 * Set the base URL of REST resource
 * @param {String} url base URL
 */
export function BaseUrl(url: string) {
  return <TFunction extends Function>(target: TFunction): TFunction => {
    target.prototype.getBaseUrl = () => url;
    return target;
  };
}

/**
 * Class decorator
 *
 * Set default headers for every method of the FeedNetHttpClient
 * @param {Object} headers deafult headers in a key-value pair
 */
export function DefaultHeaders(headers: any) {
  return <TFunction extends Function>(target: TFunction): TFunction => {
    target.prototype.getDefaultHeaders = () => headers;
    return target;
  };
}

/**
 * Method decorator
 *
 * Set custom headers for a REST method
 * @param {Object} headersDef custom headers in a key-value pair
 */
export function Headers(headersDef: any) {
  return (target: FeedNetHttpClient, propertyKey: string, descriptor: any) => {
    descriptor.headers = headersDef;
    return descriptor;
  };
}

/**
 * Method decorator
 *
 * Defines the media type(s) that the methods can produce
 * @param MediaType producesDef - MediaType to be sent
 */
export function Produces(producesDef: MediaType) {
  return (target: FeedNetHttpClient, propertyKey: string, descriptor: any) => {
    descriptor.isJSON = producesDef === MediaType.JSON;
    descriptor.isFormData = producesDef === MediaType.FORM_DATA;

    return descriptor;
  };
}

/**
 * Method decorator
 *
 * @param {*} options
 */
export function RequestOptions(options: {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body' | 'response' | string;
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
}) {
  return function (target: FeedNetHttpClient, propertyKey: string, descriptor: any) {
    options.observe = options.observe || 'body';
    options.reportProgress = isUndefined(options.reportProgress) ? false : options.reportProgress;
    options.responseType = options.responseType || 'json';
    options.withCredentials = isUndefined(options.withCredentials) ? false : options.withCredentials;

    descriptor.requestOptions = options;
    return descriptor;
  };
}
