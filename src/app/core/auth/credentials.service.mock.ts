import { User } from './credentials.service';

export class MockCredentialsService {
  credentials: User | null = {
    username: 'example@email.com',
    password: '123456',
    token: '123',
  };

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  setCredentials(user?: User, _remember?: boolean) {
    this.credentials = user || null;
  }
}
