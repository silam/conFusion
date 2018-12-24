import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import {FeedBack, ContactType } from '../shared/feedback';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
    
    
    submitFeedback(fb: FeedBack) : Observable<FeedBack>
    {
      
      const httpOptions = {
        headers : new HttpHeaders({
          'Content-Type' : 'application/json'
        })
      };

      return this.http.post<FeedBack>(baseURL + 'feedback/', fb, httpOptions)
        
        .pipe(catchError(this.processHTTPMsgService.handleError), delay(2000));

    }
}
