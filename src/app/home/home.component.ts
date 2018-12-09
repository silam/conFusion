import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


import { Promotion } from '../shared/Promotion';
import { PromotionService } from '../services/Promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish : Dish;
  promotion : Promotion;
  leader : Leader;
  dishErrMess : string;

  constructor(private dishService: DishService, 
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {

    this.dishService.getFeatureDish().
    //then((dish => this.dish = dish));
    subscribe((dish => this.dish = dish),
       errmess => this.dishErrMess = <any>errmess);
    
    this.promotionService.getFeatureDish().
      //then((promotion => this.promotion = promotion));
      subscribe((promotion => this.promotion = promotion));

    this.leaderService.getFeatureLeader().
    //then((leader => this.leader = leader));
    subscribe((leader => this.leader = leader));

  }

}
