/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';
import { BaseUrl, FeedNetHttpClient, GET, Any, Query } from '@feed-net/core/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
@BaseUrl('https://jsonplaceholder.typicode.com')
export class TestRequestService extends FeedNetHttpClient {
  constructor(http: HttpClient) {
    super(http);
  }

  @GET('/posts')
  getPosts(): Observable<any> {
    return Any
  }

  @GET('/posts')
  getCommentsByPostId(@Query('userId') userId: number): Observable<any> {
    return Any
  }
}