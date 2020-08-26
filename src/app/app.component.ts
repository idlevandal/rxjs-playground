import { Component, OnInit } from '@angular/core';
import { of, throwError } from 'rxjs';
import { concatMap, delay, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public obs1$ = of('Dave').pipe(delay(4000));
  // public obs1$ = throwError('This is an error!');

  public ngOnInit(): void {
    this.obs1$.pipe(mergeMap(val => of(`${val} Allen`)))
      .subscribe(el => console.log(el)
      )
  }
}
