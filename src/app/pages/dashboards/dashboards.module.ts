import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DateToLocalPipe } from '../../pipe';

import {
  NgbToastModule
} from '@ng-bootstrap/ng-bootstrap';

// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { CountToModule } from 'angular-count-to';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';
// Swiper Slider
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

//Module
import { DashboardsRoutingModule } from "./dashboards-routing.module";
import { SharedModule } from '../../shared/shared.module';
import { WidgetModule } from '../../shared/widget/widget.module';

//import {creatorsModel, creatorsListModel} from './RM/creators.model';
// Component
import { AnalyticsComponent } from './analytics/analytics.component';
import { CrmComponent } from './crm/crm.component';
import { CryptoComponent } from './crypto/crypto.component';
import { ProjectsComponent } from './projects/projects.component';

import { RegularComponent } from './regular/regular.component';
import { RmdbComponent } from "./RM/rmdb.component";
import { THDashboardComponent } from './THDashboard/THDashboard.component';
import { RMDashboardComponent } from './RMDashboard/RMDashboard.component';
import { KAMDashboardComponent } from './KAMDashboard/KAMDashboard.component';
import { plDashboardComponent } from "./pl/pldb.component";
import { splDashboardComponent } from "./splDashboard/splDashboard.component";
import { pldbComponent } from "./pldb/pldb.component";
import { pieComponent } from "./pie/pie.component";
import { barComponent } from "./bar/bar.component";
import { nbarComponent } from "./nbar/nbar.component";
import { areaComponent } from "./area/area.component";
import { CalendarnewComponent } from "./calendar/calendar.component";

import { NftComponent } from './nft/nft.component';
//import { UIModule } from '../../shared/ui/ui.module'
import { CleintDBComponent } from "./CleintDB/CleintDB.component";
// Calendar package
import { FullCalendarModule } from '@fullcalendar/angular';
import { myprojectsComponent } from "./myprojects/myprojects.component";
import { myeventsComponent } from "./myevents/myevents.component";
import { NgSelectModule } from '@ng-select/ng-select';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AnalyticsComponent,
    CrmComponent,
    CryptoComponent,
    ProjectsComponent,
    RegularComponent,
    RmdbComponent,
    NftComponent,  
    pldbComponent,
    pieComponent,
    barComponent,
    CleintDBComponent,
    myprojectsComponent,
    myeventsComponent,
    areaComponent,
    nbarComponent,
    CalendarnewComponent,
    THDashboardComponent,
    RMDashboardComponent,
    KAMDashboardComponent,
    plDashboardComponent,
    splDashboardComponent
  ],
  imports: [
    CommonModule,
    NgbToastModule,
    FeatherModule.pick(allIcons),
    CountToModule,
    LeafletModule,
    NgbDropdownModule,
    NgSelectModule,
    NgbNavModule,
    SimplebarAngularModule,
    NgApexchartsModule,
    SwiperModule,
    FlatpickrModule.forRoot(),
    DashboardsRoutingModule,
    SharedModule,
    WidgetModule,
   // UIModule,
    FullCalendarModule,
 //   DateToLocalPipe
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class DashboardsModule { }
