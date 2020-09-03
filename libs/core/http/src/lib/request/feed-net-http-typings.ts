/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpErrorResponse, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';

export const Any = null as any;

/**
 * Supported @Produces media types
 */
export enum MediaType {
  JSON,
  FORM_DATA,
}

export type ParamType = 'Path' | 'Query' | 'Body' | 'Header';

export type MethodType = 'DELETE' | 'GET' | 'HEAD' | 'JSONP' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT';

export interface ParamMetadata {
  key: string;
  paramIndex: number;
}

export type THeaders = string | { [name: string]: string | undefined };

export interface FeedNetHttpInterceptor {
  request?: (request: HttpRequest<any>, handler?: HttpHandler) => HttpRequest<any> | void;
  response?: (response: HttpEvent<any> | HttpErrorResponse, request?: HttpRequest<any>) => HttpEvent<any> | void;
}
