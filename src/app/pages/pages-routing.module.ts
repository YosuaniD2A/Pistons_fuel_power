import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactComponent } from './account/contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ErrorComponent } from './error/error.component';
import { FaqComponent } from './faq/faq.component';
import { MasonryGridThreeComponent } from './portfolio/masonry-grid-three/masonry-grid-three.component';

const routes: Routes = [
  { 
    path: 'contact', 
    component: ContactComponent 
  },
  { 
    path: 'aboutus', 
    component: AboutUsComponent 
  },
  { 
    path: '404', 
    component: ErrorComponent 
  },
  { 
    path: 'faq', 
    component: FaqComponent 
  },
  { 
    // path: 'gallery/masonry/grid/three', 
    path: 'gallery', 
    component: MasonryGridThreeComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
