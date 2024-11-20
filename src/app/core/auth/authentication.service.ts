import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { CredentialsService, User } from './credentials.service';
import { tap } from 'rxjs/operators';
import { HttpDispatcherService } from '../http/http-dispatcher.service';
import { Logger } from '../logger.service';
//import * as _ from 'lodash-es';

const log = new Logger('HttpDispatcherService');

const routes = {
  login: () => `/users/login`,
  whoAmI: () => `/users/me`,
  refresh: () => `/users/token/refresh`,
};

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private statusCode = 'statusCode';
  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private credentialsService: CredentialsService, private httpDispatcher: HttpDispatcherService) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));

    this.user = this.userSubject.asObservable();
    //this.user = this.userSubject;
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The
   * user credentials.
   */
  login(context: LoginContext) {
    // Replace by proper authentication call
    const data: any = {
      username: context.username,
      password: context.password,
    };

    console.log('authservice');

    console.log(routes.login()); //environment.serverUrl

    return this.httpDispatcher.post<LoginContext>(routes.login(), data).pipe(
      tap((responseData: any) => {
        if (responseData[this.statusCode] === 200) {
          this.credentialsService.setCredentials(responseData['token'], context.remember);
          return responseData['token'];
        }
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    localStorage.removeItem('user');
    localStorage.clear();
    this.userSubject.next(null);

    return of(true);
  }

  /**
   * Authenticated user details.
   * @return The user details.
   */
  whoAmI(): Observable<User[]> {
    return this.httpDispatcher.get<User[]>(routes.whoAmI());
  }

  /**
   * Auto refresh token for authenticated user details.
   * @return The new token.
   */
  refreshToken() {
    return this.httpDispatcher.post<any>(routes.refresh(), {}).pipe(
      tap((responseData) => {
        const user = JSON.parse(localStorage.getItem('currentUser')!);
        if (responseData[this.statusCode] === 200) {
          this.credentialsService.setCredentials(responseData['token'], false);
          return responseData['token'];
        }
      })
    );
  }
}
