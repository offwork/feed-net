import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpRequestModule } from '@feed-net/core/http';
import { AppComponent } from './app.component';
import {TestRequestService} from './test.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpRequestModule],
  providers: [ TestRequestService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
