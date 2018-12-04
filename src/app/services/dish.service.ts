import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import {DISHES} from '../shared/dishes';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes() : Observable<Dish[]> {
    // return new Promise(resolve => {
    //   // simulate server latency with 2 seocnds delay
    //   setTimeout(() => resolve(DISHES), 2000);
    // }) ;

    //return of(DISHES).pipe(delay(2000)).toPromise();

    return of(DISHES).pipe(delay(2000))
  }

  getDish(id: string): Observable<Dish> {
  //   return new Promise(resolve => {
  //     // simulate server latency with 2 seocnds delay
  //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);

  // });

  return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));

}

  getFeatureDish(): Observable<Dish>
  {
      // return new Promise(resolve => {
      //   // simulate server latency with 2 seocnds delay
      //   setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
      // });


      return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

  getDishIds() : Observable<string [] | any>
  {
    return of(DISHES.map(dish => dish.id))
  }

}
