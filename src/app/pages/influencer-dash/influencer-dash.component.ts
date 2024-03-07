import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-influencer-dash',
  templateUrl: './influencer-dash.component.html',
  styleUrls: ['./influencer-dash.component.scss']
})
export class InfluencerDashComponent implements OnInit {

  public accountForm: UntypedFormGroup;
  activeTab: string = 'orders';

  editInfo: boolean = false;

  data: any;
  options: any;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.createAccountForm();
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--bs-white');
    const textColorSecondary = documentStyle.getPropertyValue('--bs-white');
    const surfaceBorder = documentStyle.getPropertyValue('--bs-gray');
    
    this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Sales',
                backgroundColor: documentStyle.getPropertyValue('--bs-blue'),
                borderColor: documentStyle.getPropertyValue('--bs-blue'),
                data: [18, 55, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            // {
            //     label: 'My Second dataset',
            //     backgroundColor: documentStyle.getPropertyValue('--theme-deafult'),
            //     borderColor: documentStyle.getPropertyValue('--theme-deafult'),
            //     data: [28, 48, 40, 19, 86, 27, 90]
            // }
        ]
    };

    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 100
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }

        }
    };
}

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      discount_percent: ['', Validators.required],
      password: [''],
      confPassword: [''],
      fb_account: [''],
      in_account: [''],
      tt_account: [''],
      x_account: [''],
      yt_account: [''],
    });
  }

  saveUser(accountForm: any){}

  enableEdition(){
    this.editInfo = !this.editInfo;
  }
}
