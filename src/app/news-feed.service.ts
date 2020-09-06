import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from, forkJoin } from 'rxjs';
import { map, catchError, shareReplay, tap, mergeMap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {

  private readonly _URL = 'https://hacker-news.firebaseio.com/v0/';

  constructor(private http: HttpClient) { }

  news$: Observable<any> = this.http.get(`${this._URL}topstories.json`).pipe(
    tap(console.log),
    map(res => res.slice(0, 10)),
    mergeMap(el => this.joinWithVariableRequests$(el)),
    catchError(err => {
      console.log('error loading feed');
      console.log(err);
      return of(null);
    }),
    shareReplay()
  )

  getStory(id: any) {
    return this.http.get(`${this._URL}item/${id}.json`);
  }

  // forkJoin multiple requests...
  joinWithVariableRequests$ = (args) => {
    return forkJoin(args.map(e => this.http.get(`${this._URL}item/${e}.json`)));
  };
}