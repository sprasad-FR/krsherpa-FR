import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export interface User {
  // Customize received credentials here

  id:string;
        username: string;
        password: string;
        firstName: string;
        lastName: string;
        token: string;
        email: string;
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
    this.getcre();
    }


  getcre()
  {

    const savedCredentials = localStorage.getItem('user');// || localStorage.getItem(credentialsKey);
    console.log('credentialsKey',savedCredentials)
    const tkn = localStorage.getItem('token');
    console.log('tkn',tkn)
    if ( tkn && tkn!=null && tkn!='' )
    {
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }
  else
  {
    localStorage.removeItem('user')
    localStorage.removeItem('token');
  }
  //this._credentials = null;

  


  }
  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {

    this.getcre();

debugger
    return !!this.credentials;

  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): User | null {
    this.getcre();
    console.log('in intercept credentials',this._credentials);
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

    localStorage.setItem(credentialsKey, JSON.stringify(credentials))

  }
}
