import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { privateDecrypt } from 'crypto';
import { InfluencersService } from 'src/app/shared/services/influencers.service';

@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class InfluencersComponent implements OnInit {

  items: any[];
  message: string = '';
  public login:  UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
		config: NgbModalConfig,
		private modalService: NgbModal,
    private router: Router,
    private influencersService: InfluencersService
	) {
		config.backdrop = 'static';
		config.keyboard = false;

    this.login = this.fb.group({
      emailOrCode: ['', [Validators.required]],
      password: ['', Validators.required],
    })
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

  async loginProcess() {
    this.message = '';
    const data: any = this.login.value;
    
    try {
      if(data.emailOrCode === '' || data.password === '')
      {
        this.message = 'Do not leave empty fields';
        // alert('Do not leave empty fields')
        return;
      }

      let resp = await this.influencersService.login(data);
      
      localStorage.setItem('influencerId', resp.influencer.id);
      localStorage.setItem('influencerToken', resp.token);

      this.router.navigateByUrl('/page/influencers-dash');
      this.modalService.dismissAll('Cross click');

    } catch (error: any) {
      if(error.error){
        this.message = error.error.msg;
        console.error(error.error.msg); 
      }else{
        console.error(error.message); 
        alert(error.message)
      }

    }
  }

  open(content) {
    if(localStorage.getItem('influencerToken')){
      this.router.navigateByUrl('/page/influencers-dash')
    }else{
      this.modalService.open(content, { size: 'md', centered: true });
    }
	}

  signIn(){
    console.log(this.login.value);
    
    this.router.navigateByUrl('/page/influencers-dash')
    this.modalService.dismissAll('Cross click');
  }

}
