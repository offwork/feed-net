import { NgModule, Provider } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FeedNetHttpProvider } from './feed-net-http-provider';
import { FeedNetHttpInterceptors } from './feed-net-http-interceptors';

export const FEED_NET_HTTP_PROVIDERS: Provider[] = [FeedNetHttpProvider];

@NgModule({
  imports: [HttpClientModule, HttpClientJsonpModule],
  providers: [
    ...FEED_NET_HTTP_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FeedNetHttpInterceptors,
      multi: true,
    },
  ],
})
export class HttpRequestModule {}
