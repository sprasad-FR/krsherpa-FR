import { Observable, of } from 'rxjs';

import { LoginContext } from './authentication.service';
import { User } from './credentials.service';

export class MockAuthenticationService {
  credentials: User | null = {
    username: 'example@email.com',
    password: '123456',
    token: '123',
  };

  login(context: LoginContext): Observable<User> {
    return of({
      id: 1,
      username: context.username,
      password: '123456',
      token: '123456',
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }
}
