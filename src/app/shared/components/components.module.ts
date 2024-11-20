import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { CardComponent } from './card/card.component';
//import { TransactionComponent } from './transaction/transaction.component';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, NgbModalModule],
  exports: [CardComponent],
})
export class ComponentModule {}
