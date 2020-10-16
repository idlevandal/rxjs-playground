import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { NewsfeedService } from '../newsfeed.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  // recall api every 30 seconds
  private refreshTimer$ = timer(0, 60000);
  private sub: Subscription;
  
  newsObs = this.newsFeedService.news$;

  constructor(private newsFeedService: NewsfeedService) { }

  ngOnInit(): void {
    this.sub = this.refreshTimer$.subscribe(this.newsFeedService.refresh$);

    this.newsObs.subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
