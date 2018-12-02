import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FeedBack, ContactType } from '../shared/feedback';
//import { ENGINE_METHOD_NONE } from 'constants';
import { Directive, Input, ViewChild} from '@angular/core';
 
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm : FormGroup;
  feedback: FeedBack;
  contacttype = ContactType;

  // form reset to pristine value
  // ensure the form reset to initial value
  @ViewChild('fform') feedbackFormDirective
  
  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm()
  {
    this.feedbackForm = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        telnum: [0, Validators.required],
        email: ['', Validators.required],
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
    this.feedbackForm.reset({

      firstname : '',
      lastname:'',
      email: '',
      telnum: 0,
      message: '',
      agree: false,
      contacttype: 'None'

    });

    // ensure reset form to pristine value
    this.feedbackFormDirective.resetForm();
  }
}
