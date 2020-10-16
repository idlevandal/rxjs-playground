import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  public refresh$ = new Subject();

  constructor(private http: HttpClient) { }

  loadNews$ = this.http.get('https://jsonplaceholder.typicode.com/users');

  news$ = this.refresh$.pipe(
    exhaustMap(() => this.loadNews$)
  )
}
