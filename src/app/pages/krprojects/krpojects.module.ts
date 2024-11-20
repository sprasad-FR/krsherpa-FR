import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { NgbPaginationModule,  NgbDropdownModule, NgbNavModule,NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Mask
import { NgxMaskModule } from 'ngx-mask';
// Sorting Pages
import { NgKRProductsSortableHeader } from '../krprojects/products/products-sortable.directive';
// Range Slider
import { NgxSliderModule } from '@angular-slider/ngx-slider';
// Simple bar
import { SimplebarAngularModule } from 'simplebar-angular';
// Swiper Slider
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
// Ck Editer
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// File Uploads
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';
// Ng Select
import { NgSelectModule } from '@ng-select/ng-select';
// Wizard
import { ArchwizardModule } from 'angular-archwizard';
// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';
// Count
import { CountToModule } from 'angular-count-to';

// Load Icon
import { defineLordIconElement } from 'lord-icon-element';
import lottie from 'lottie-web';

// Component Pages
import { KRProjectsRoutingModule } from './krpojects-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AddProductComponent } from './add-product/add-product.component';
import { OrdersComponent } from './orders/orders.component';
import { StarterComponent } from './starter/starter.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { CustomersComponent } from './customers/customers.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SellersComponent } from './sellers/sellers.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { NgbTooltipModule,NgbTypeaheadModule,NgbNavOutlet, NgbAccordionModule, NgbRatingModule,  NgbProgressbarModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
// Simple bar




// Component Pages



import { OverviewComponent } from './overview/overview.component';




import {DatePipe} from '@angular/common';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    ProductsComponent,
    NgKRProductsSortableHeader,
    ProductDetailComponent,
    AddProductComponent,
    StarterComponent,
    OrdersComponent,
    OrdersDetailsComponent,
    CustomersComponent,
    CartComponent,
    CheckoutComponent,
    SellersComponent,
    SellerDetailsComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbRatingModule,
    NgbTooltipModule,
    NgxSliderModule,
    SimplebarAngularModule,
    SwiperModule,
    CKEditorModule,
    DropzoneModule,
    FlatpickrModule.forRoot(),
    NgSelectModule,
    ArchwizardModule,
    NgApexchartsModule,
    CountToModule,
    KRProjectsRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbPaginationModule,
    FeatherModule.pick(allIcons), 
    CKEditorModule,
    FlatpickrModule,
    DropzoneModule,
    NgSelectModule,
    SharedModule
  ],
  providers: [
    DatePipe,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KRProjectsModule { 
  constructor() {
    defineLordIconElement(lottie.loadAnimation);
  }
}
