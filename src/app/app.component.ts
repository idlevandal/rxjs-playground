import { Component, OnInit } from '@angular/core';
import { of, throwError, fromEvent, interval } from 'rxjs';
import { concatMap, delay, mergeMap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

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

  public ngOnInit(): void {
    // MERGEMAP / CONCATMAP (main diff - concatmap sequence of execution is guaranteed)
    // mergemap executes in parallel (async) (merge 2 obs into 1)
    // this.obs1$.pipe(mergeMap(val => of(`${val} Allen`)))
    //   .subscribe(el => console.log(el)
    //   )
    
    // swap concatMap & mergeMap
    of(1, 2, 3).pipe(
        concatMap(num => of(`the num is ${num}`).pipe(delay(2000)))
      ).subscribe(console.log);
    

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

  }
}
