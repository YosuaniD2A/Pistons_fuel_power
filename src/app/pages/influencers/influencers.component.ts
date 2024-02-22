import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.scss']
})
export class InfluencersComponent implements OnInit {

  items: MenuItem[] | undefined;
  responsiveOptions: any[] | undefined;

  position: string = 'top';

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.items = [
      {
        title: 'Deal 1',
        body: `Welcome to the Crew: Choose 4 T-shirts from our collection. This isn't just a gift; it's your intro to the quality and style we're all about.`
      },
      {
        title: 'Deal 2',
        body: `Earn your keep: Share that code, and pull in a 50% commission on the sales. It's straightforward. Just share and the rewards will follow.`
      },
      {
        title: 'Deal 3',
        body: `Exclusive Collaboration: Hit 50 redemptions with your code, and we open up the garage for a co-created exclusive collection.`
      },
      {
        title: 'Deal 4',
        body: `Keep it under control: Our dashboard is set up for you to track sales, commissions, and when you want to cash out.`
      }
    ];
    // this.items = [
    //     {
    //         label: 'Finder',
    //         icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg'
    //     },
    //     {
    //         label: 'App Store',
    //         icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg'
    //     },
    //     {
    //         label: 'Photos',
    //         icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg'
    //     },
    //     {
    //         label: 'Trash',
    //         icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png'
    //     }
    // ];
  }

}
