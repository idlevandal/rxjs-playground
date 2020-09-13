import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaveSubService {

  private boolSub$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  setValue(val: boolean): void {
    this.boolSub$.next(val);
  }

  getValue(): Observable<boolean> {
    return this.boolSub$.asObservable();
  }
}
