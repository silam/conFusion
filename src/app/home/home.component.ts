import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


import { Promotion } from '../shared/Promotion';
import { PromotionService } from '../services/Promotion.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish : Dish;
  promotion : Promotion;
  
  constructor(private dishService: DishService, 
    private promotionService: PromotionService) { }

  ngOnInit() {

    this.dish = this.dishService.getFeatureDish();
    this.promotion = this.promotionService.getFeatureDish();
  }

}
