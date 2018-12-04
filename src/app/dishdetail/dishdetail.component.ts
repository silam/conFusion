import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  //@Input()
  dish : Dish;
  dishIds : string[];
  prev: string;
  next: string;


  //selectDish = Dish[0];

  constructor(private dishService: DishService, 
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {

   this.dishService.getDishIds()
    .subscribe((dishIds) => this.dishIds = dishIds);

    // set of obervable, one called param
    // obtain param within URL
    // :id is obervable
    // snapshot one snapshot form route service
    // make param observable. 
    // when a change in param, we see change in dishdetail
    //let id = this.route.snapshot.params.pipe(
    //  switchMap((params: Params) =>this.dishService.getDish(params['id'])));
    

    
    //this.dishService.getDish(id)
    //.subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id)} );
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });

  }

  setPrevNext(dishId: string)
  {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }
  goBack(): void
  {
      this.location.back();
  }

}
