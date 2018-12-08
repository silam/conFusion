import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';

import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Directive, ViewChild} from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {


  commentForm : FormGroup;
  comment: Comment;


  @ViewChild('fform') commentFormDirective;

  formErrors = {
    'author' : '',
    'comment' : ''
  };

  validationMessages = {
    'author': {
      'required':      'Author is required.',
      'minlength':     'Author must be at least 2 characters long.',
      'maxlength':     'Author cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'comment is required.'
      
    },
    
  };

  //@Input()
  dish : Dish;
  dishIds : string[];
  prev: string;
  next: string;


  //selectDish = Dish[0];

  constructor(private dishService: DishService, 
    private route: ActivatedRoute,
    private location: Location,
    private cf: FormBuilder) {
      this.createForm();
     }

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

  createForm()
  {
    this.commentForm = this.cf.group(
      {
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        comment: ['', [Validators.required] ],
        rating: [5]      
      }
    );
      this.commentForm.valueChanges
        .subscribe( data => this.onValueChanged(data));

      this.onValueChanged();// reset form validataion message
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit()
  {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    this.commentForm.reset({

      author : '',
      rating : 5,
      comment:'',
      date: ''

    });

    var start = Date.now();


    var event = new Date(Date.now());

    
    console.log(event.toDateString());
    this.comment.date = event.toISOString();
    

    this.dish.comments.push(this.comment);

    // ensure reset form to pristine value
    // ensure reset form to pristine value
    this.commentFormDirective.resetForm();

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
