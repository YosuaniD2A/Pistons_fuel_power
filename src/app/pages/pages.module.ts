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

import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ContactComponent,
    AboutUsComponent,
    ErrorComponent,
    FaqComponent,
    MasonryGridThreeComponent,
    TrackingComponent,
  ],
  imports: [
    CommonModule,
    GalleryModule,
    LightboxModule,
    SharedModule,
    PagesRoutingModule,
    ImageModule,
    RouterModule
  ]
})
export class PagesModule { }
