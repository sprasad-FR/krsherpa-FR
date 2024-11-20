import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe } from '../core/pipe';
import { ConfirmExpertRoutingModule } from './confirm-expert-routing.module';
import { ConfirmExpertComponent } from './confirm-expert.component';

@NgModule({
  declarations: [ConfirmExpertComponent],
  imports: [CommonModule, ConfirmExpertRoutingModule, SharedModule, DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe],
})
export class ConfirmExpertModule {}
