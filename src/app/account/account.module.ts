import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

// Load Icons
import { defineLordIconElement } from 'lord-icon-element';
import lottie from 'lottie-web';

import { ToastsContainer } from './login/toasts-container.component';
import { SharedModule } from '../shared';

import { AccountRoutingModule } from './account-routing.module';
import { SigninModule } from "./auth/signin/signin.module";
import { SignupModule } from "./auth/signup/signup.module";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { forgotpasswordComponent } from './forgotpassword/forgotpassword.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ToastsContainer,
    PasswordresetComponent,
    forgotpasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbToastModule,
    AccountRoutingModule,
    SigninModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { 
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
}
