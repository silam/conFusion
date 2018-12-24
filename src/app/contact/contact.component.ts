import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FeedBack, ContactType } from '../shared/feedback';
//import { ENGINE_METHOD_NONE } from 'constants';
import { Directive, Input, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError, delay } from 'rxjs/operators';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { Observable, of } from 'rxjs';
import { FeedbackService } from "../services/feedback.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm : FormGroup;
  feedback: FeedBack;

  retfeedbackForm : FormGroup;
  retfeedback: FeedBack;

  contacttype = ContactType;

  visibilityFlag = 0;

  // form reset to pristine value
  // ensure the form reset to initial value
  @ViewChild('fform') feedbackFormDirective
  @ViewChild('retfform') retfeedbackFormDirective

  formErrors = {
    'firstname' : '',
    'lastname' : '',
    'email' : '',
    'telnum' : ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private feedbackService: FeedbackService
    ,private fb: FormBuilder,
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService)  { 
    this.createForm();

    this.visibilityFlag = 0;
  }

  ngOnInit() {
  }

  createForm()
  {
    this.feedbackForm = this.fb.group(
      {
        firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        telnum: [0, [Validators.required, Validators.pattern]],
        email: ['', [Validators.required, Validators.email]],
        agree: false,
        contacttype: 'None',
        message: ''
      }
    );
      this.feedbackForm.valueChanges
        .subscribe( data => this.onValueChanged(data));

      this.onValueChanged();// reset form validataion message




      this.retfeedbackForm = this.fb.group(
        {
          firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
          lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
          telnum: [0, [Validators.required, Validators.pattern]],
          email: ['', [Validators.required, Validators.email]],
          agree: false,
          contacttype: 'None',
          message: ''
        }
      );
        
      this.retfeedbackForm.valueChanges
      .subscribe( data => this.onFBValueChanged(data));

      this.onFBValueChanged();// reset form validataion message


  }
  onFBValueChanged(data?: any)
  {
    if ( !this.retfeedbackForm)
    {
      return;
    }
  }
  onValueChanged(data?: any)
  {
    if ( !this.feedbackForm)
    {
      return;
    }
    const form = this.feedbackForm;
    for ( const field in this.formErrors)
    {
      if ( this.formErrors.hasOwnProperty(field))
      {
        // clear previous error message
        this.formErrors[field] = '';
        const control = form.get(field);
        if ( control  && control.dirty && !control.valid    )
        {
            const message = this.validationMessages[field];
            for ( const key in control.errors)
            {
              if ( control.errors.hasOwnProperty(key))
              {
                this.formErrors[field] += message[key] + ' ';

                
              }
            }
        }
      }
    }
  }


  onSubmit()
  {

    this.visibilityFlag = 1;

    var event = new Date(Date.now());

    
    console.log(event.toTimeString());


    this.feedback = this.feedbackForm.value;
    this.retfeedback = null;

    this.feedbackService.submitFeedback(this.feedback)
    .subscribe(feedback => {

      this.visibilityFlag = 2;
      this.retfeedback = feedback;
    
      var event = new Date(Date.now());

    
      console.log(event.toTimeString());

        setTimeout(()=>{   
          var event = new Date(Date.now());

    
          console.log(event.toTimeString());

        this.visibilityFlag = 0;
      }, 5000);
    });
    
    
   
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
