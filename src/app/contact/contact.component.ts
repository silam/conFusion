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

  formErrors = {
    'firstname' : '',
    'lastname' : '',
    'email' : '',
    'telnum' : ''
  };

  validationMessages = {
    'firstname': {
      'required' : 'First name is required',
      'minLength' : 'at least 2 characters long',
      'maxLength' : 'not more than 25 characters long'
    },
    'lastname': {
      'required' : 'Last name is required',
      'minLength' : 'at least 2 characters long',
      'maxLength' : 'not more than 25 characters long'
    },

    'telnum': {
      'required' : 'telnum is required',
      'pattern' : 'Tel. Number conain only numbers'
    },
    'email': {
      'required' : 'email is required',
      'email' : 'email is not in valid format'
    }

  };

  constructor(private fb: FormBuilder) { 
    this.createForm();
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
