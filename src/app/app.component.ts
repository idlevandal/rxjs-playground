import { Component, OnInit } from '@angular/core';
import { of, throwError, fromEvent, interval, forkJoin, from, combineLatest, timer, Observable } from 'rxjs';
import { concatMap, delay, mergeMap, switchMap, debounceTime, distinctUntilChanged, tap, map, take, filter, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Todo } from './interfaces/todo.interface';
import { TodoService } from './todo.service';
import { NewsFeedService } from './news-feed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public counter: number = 0;
  public searchControl: FormControl = new FormControl();

  public obs1$ = of('Dave').pipe(delay(4000)); 
  // public obs1$ = throwError('This is an error!');

  constructor(private newsFeedService: NewsFeedService ,private todoService: TodoService) {}

  public ngOnInit(): void {
    this.newsFeedService.news$.subscribe(console.log);
    // this.newsFeedService.getStory(24387821).subscribe(console.log);
    // this.newsFeedService.joinWithVariableRequests$([24388803, 24389064, 24389036, 24389143, 24389058, 24389275, 24387821, 24386584, 24388753, 24386826])
    //   .subscribe(console.log);


    // FROM EVENT
    // const ev = fromEvent(document, 'click');
    
    // ev.pipe(
    //   tap(console.log),
    //   map(({x, y}: MouseEvent) => ({x, y}))
    // )
    // .subscribe(console.log);

    // MAP **note: you need the extra internal map because the obs is an array, not needed if obs is obj
    // this.todoService.getTodos().pipe(
    //   map((res: Todo[]) =>
    //     res.map((data: Todo) => {
    //       return {
    //         id: data.id,
    //         completed: data.completed
    //       };
    //     })
    //   )
    // ).subscribe(console.log);
    // v2 with destructuring
    // this.todoService.getTodos().pipe(
    //   map((res: Todo[]) =>
    //     res.map(({id, title}: Todo) => ({id, title}))
    //   )
    // ).subscribe(console.log);

    // MERGEMAP / CONCATMAP (main diff - concatmap sequence of execution is guaranteed)
    // mergemap executes in parallel (async) (merge 2 obs into 1)
    // this.obs1$.pipe(mergeMap(val => of(`${val} Allen`)))
    //   .subscribe(el => console.log(el)
    //   )
    
    // swap concatMap & mergeMap
    // of(1, 2, 3).pipe(
    //     tap(console.log),
    //     concatMap(num => of(`the num is ${num}`).pipe(delay(2000))),
    //     tap(console.log),
    //     mergeMap(el => of(`=> ${el}`))
    //   ).subscribe(console.log);

    // SWITCHMAP cancel previous inner observable & re-subscribe (search)
    // fromEvent(document, 'click')
    //   .pipe(switchMap(() => interval(700)))
    //   .subscribe(el => this.counter = el);

    // this.searchControl.valueChanges.pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged(),
    //   switchMap(() => interval(500))
    // )
    // .subscribe(val => this.counter = val);

    // FORKJOIN
    // Best practices: https://medium.com/better-programming/rxjs-forkjoin-never-use-array-indexes-in-subscribe-1f4005582ae8
    // returns 3, 6 & 'Dave'
    // forkJoin([ 
    //   of(1, 2, 3).pipe(tap(console.log), map(el => el * 3)),
    //   from([4, 5, 6]).pipe(delay(3000)),
    //   of('fork join')
    // ]).subscribe(console.log);

    // COMBINELATEST
    // returns
    // combineLatest([
    //   of(1, 2, 3),
    //   from([4, 5, 6]).pipe(delay(1)),
    //   of('combine latest')
    // ]).subscribe(console.log);

  }

  // FORKJOIN vs COMBINELATEST
  // forkJoin - When all observables complete, emit the last emitted value from each.
  // combineLatest - When any observable emits a value, emit the latest value from each.
  // Usage is pretty similar, but you shouldn't forget to unsubscribe from combineLatest unlike forkJoin.
}
