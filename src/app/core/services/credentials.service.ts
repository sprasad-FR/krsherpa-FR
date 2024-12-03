import { Injectable } from '@angular/core';

export interface User {
  // Customize received credentials here
  id: string;
  username: string;
  password: string;
  roles: Role;
}

export enum Role {
  Director = 'director',
  Admin = 'admin',
  Employee = 'employee',
  MainPLHead = 'mainPLHead',
  SubPLHead = 'subPLHead',
  SalesHead = 'salesHead',
  SalesManager = 'salesManager',
  KAM = 'keyAccountManager',
  FinanceHead = 'financeHead',
  FinanceUser = 'financeUser',
  ResearchManager = 'researchManager',
  ResearchAnalyst = 'researchAnalyst',
  Compliance = 'compliance',
  Client = 'client',
  // ClientCompliance = ['client','compliance'],
  Expert = 'expert',
  SRM = 'StrategicTeamManager',
  SRA = 'StrategicTeamMember',
}

const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The User interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private _credentials: User | null = null;

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): User | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: User, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
