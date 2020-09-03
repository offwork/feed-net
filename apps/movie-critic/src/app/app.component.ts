import { Component, OnInit } from '@angular/core';
import { TestRequestService } from './test.service';
import { FeedNetHttpProvider } from '@feed-net/core/http';

@Component({
  selector: 'feed-net-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'movie-critic';
  constructor(private testService: TestRequestService, private httpProvider: FeedNetHttpProvider) {
    this.httpProvider.addInterceptor({
      request: (request) => {request.clone({ setHeaders: {'Kerem': 'Merhaba' } })},
      response: (response) => console.log('Global interceptors(response)', response)
    });
  }

  ngOnInit(): void {
    // this.testService.getPosts().subscribe();
    this.testService.getCommentsByPostId(1).subscribe();
  }
}
