import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpSentEvent,
  HttpProgressEvent,
  HttpUserEvent,
  HttpEvent,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Logger } from '../logger.service';
import { environment } from '@env/environment';

const log = new Logger('Error Handler Interceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  error: any;
  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any> | HttpSentEvent | HttpProgressEvent | HttpUserEvent<any> | any> {
    return next.handle(request).pipe(catchError((error) => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: any): Observable<HttpEvent<any>> {
    if (response === undefined) {
      throw 'Unable to establish connectiion with API..!';
    }

    // If Validation error
    else if (response.status === 400 || response.status === 422) {
      this.error = response.error.error;
      throw this.error;
    } else if (response.status === 401) {
      // Unauthenticated
      this.error = response.error.error;
      throw this.error;
    } else if (response.status === 403) {
      // Unauthorised Access
      this.error = response.error.error;
      throw this.error;
    }

    // if (response.status === 440) {
    //   // Session Expired
    //   this.error = 'Session Expired';
    //   this.authenticationService.logout();
    // }

    if (!environment.production) {
      if (response.error instanceof ErrorEvent) {
        log.error('Error Event: ', response.error);
        // Log client-side or network error
        this.error = response.error?.error.message ? response.error.error.message : 'Something went wrong!';
      } else {
        log.error('Error Event Else: ', response.error);
        // Log server-side error [The response body may contain clues as to what went wrong]
        this.error = response.error?.error?.message;
      }
    }

    throw this.error;
  }
}
