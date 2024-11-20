import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import { User } from '../models/auth.models';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { GlobalComponent } from "../../global-component";
import { tap } from 'rxjs/operators';
import { CredentialsService } from './credentials.service';
import { environment } from '../../../environments/environment';
import { catchError,  } from 'rxjs/operators';


const AUTH_API = GlobalComponent.AUTH_API;

export interface LoginContext {
    username: string;
    password: string;
    remember?: boolean;
  }
  
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  const routes = {
    login: () => `/users/login`,
    whoAmI: () => `/users/me`,
    refresh: () => `/users/token/refresh`,
  };
@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {

    user!: User;
    currentUserValue: any;

    private currentUserSubject: BehaviorSubject<User>;
    // public currentUser: Observable<User>;

    constructor(private http: HttpClient,private credentialsService: CredentialsService,) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')!));
        // this.currentUser = this.currentUserSubject.asObservable();
     }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, first_name: string, password: string) {        
        // return getFirebaseBackend()!.registerUser(email, password).then((response: any) => {
        //     const user = response;
        //     return user;
        // });

        // Register Api
        return this.http.post(AUTH_API + '', {  // return this.http.post(AUTH_API + 'signup', {
            email,
            first_name,
            password,
          }, httpOptions);
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    // login(email: string, password: string) {
        login(context: LoginContext) {
            // Replace by proper authentication call
            const data: any = {
              username: context.username,
              password: context.password,
            };
        
        // return getFirebaseBackend()!.loginUser(email, password).then((response: any) => {
        //     const user = response;
        //     return user;
        // });

        return this.http.post(AUTH_API + '',     //   return this.http.post(AUTH_API + 'signin', {
            data
          , httpOptions);
    }

    /**
     * Returns the current user
     */
    public currentUser(): any {
        return getFirebaseBackend()!.getAuthenticatedUser();
    }

    /**
     * Logout the user
     */
    logout() {
        // logout the user
        // return getFirebaseBackend()!.logout();
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null!);
    }


  /**
   * Authenticated user details.
   * @return The user details.
   */
  whoAmI(): Observable<User[]> {
   let url=environment.serverUrl+routes.whoAmI() ;
   let headers = new HttpHeaders({

    'Content-Type': 'application/json',

    'Authorization': `Bearer `+ localStorage.getItem('token')

  });


  return this.http.get<any>(url,
    { headers: headers }).pipe(
    map((response) => {
      return response; //response['error'] && response['error']['statusCode'] != 200 ? response['error']['message'] : response;
    }),
    tap((item) => {
      if (item) {
        return item;
      }
      return item;
    }),
    catchError(this.handleError)   //his.handleError
  );
}



private handleError(error: HttpErrorResponse) {
    // log.error('An error occurred (dispatcher):', error);
     return throwError(error);
   

   // return this.http.get<User[]>(url);
  }

  /**
   * Auto refresh token for authenticated user details.
   * @return The new token.
   */
  private statusCode = 'statusCode';
  refreshToken() {
    let url=environment.serverUrl+routes.whoAmI() ;
    return this.http.post<any>(url, {}).pipe(
      tap((responseData) => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (responseData[this.statusCode] === 200) {
          this.credentialsService.setCredentials(responseData['token'], false);
          return responseData['token'];
        }
      })
    );
  }



    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend()!.forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

}

