/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';
import {
  HttpEventType,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { FeedNetHttpProvider } from './feed-net-http-provider';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class FeedNetHttpInterceptors implements HttpInterceptor {
  constructor(private httpProvider: FeedNetHttpProvider) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const httpRequest = this.httpProvider.requestHandler(req);
    return next.handle(httpRequest).pipe(
      map((response) => {
        if ([HttpEventType.Response, HttpEventType.ResponseHeader].indexOf(response.type) !== -1) {
          return this.httpProvider.responseHandler(response, httpRequest) || response;
        }
        return response;
      }),
      catchError((error) => throwError(this.httpProvider.responseHandler(error, httpRequest) || error))
    );
  }
}
