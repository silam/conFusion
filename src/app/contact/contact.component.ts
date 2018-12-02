import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FeedBack, ContactType } from '../shared/feedback';
//import { ENGINE_METHOD_NONE } from 'constants';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm : FormGroup;
  feedback: FeedBack;
  contacttype = ContactType;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm()
  {
    this.feedbackForm = this.fb.group(
      {
        firstname: '',
        lastname: '',
        telnum: 0,
        email: '',
        agree: false,
        contacttype: 'None',
        message: ''
      }
    );

  }

  onSubmit()
  {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset();
  }
}
