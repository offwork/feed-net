import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpRequestModule } from '@feed-net/core/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpRequestModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
