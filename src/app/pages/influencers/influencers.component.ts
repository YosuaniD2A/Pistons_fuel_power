import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class InfluencersComponent implements OnInit {

  items: any[];

  constructor(
		config: NgbModalConfig,
		private modalService: NgbModal,
    private router: Router
	) {
		config.backdrop = 'static';
		config.keyboard = false;
	}

  ngOnInit() {

    this.items = [
      {
        title: 'Step 1',
        body: `Welcome to the Crew: Choose 4 T-shirts from our collection. This isn't just a gift; it's your intro to the quality and style we're all about.`
      },
      {
        title: 'Step 2',
        body: `Earn your keep: Share that code, and pull in a 50% commission on the sales. It's straightforward. Just share and the rewards will follow.`
      },
      {
        title: 'Step 3',
        body: `Exclusive Collaboration: Hit 50 redemptions with your code, and we open up the garage for a co-created exclusive collection.`
      },
      {
        title: 'Step 4',
        body: `Keep it under control: Our dashboard is set up for you to track sales, commissions, and when you want to cash out.`
      }
    ];
  }

  open(content) {
		this.modalService.open(content, { size: 'md', centered: true });
	}

  signIn(){
    this.router.navigateByUrl('/page/influencers-dash')
    this.modalService.dismissAll('Cross click');
  }

}
