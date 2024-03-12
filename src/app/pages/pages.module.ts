import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { GalleryModule } from '@ks89/angular-modal-gallery';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';

import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

// Pages Components
import { ContactComponent } from './account/contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorComponent } from './error/error.component';
import { FaqComponent } from './faq/faq.component';
import { ImageModule } from 'primeng/image';

// Portfolio Components
import { MasonryGridThreeComponent } from './portfolio/masonry-grid-three/masonry-grid-three.component';
import { TrackingComponent } from './tracking/tracking.component';

import { DockModule } from 'primeng/dock';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';

import {RouterModule} from '@angular/router';
import { InfluencersComponent } from './influencers/influencers.component';
import { InfluencerDashComponent } from './influencer-dash/influencer-dash.component';


@NgModule({
  declarations: [
    ContactComponent,
    AboutUsComponent,
    ErrorComponent,
    FaqComponent,
    MasonryGridThreeComponent,
    TrackingComponent,
    InfluencersComponent,
    InfluencerDashComponent,
  ],
  imports: [
    CommonModule,
    GalleryModule,
    LightboxModule,
    SharedModule,
    PagesRoutingModule,
    ImageModule,
    DockModule,
    ChartModule,
    DividerModule,
    TabViewModule,
    ToastModule,
    CardModule,
    CarouselModule,
    RouterModule
  ]
})
export class PagesModule { }
