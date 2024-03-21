import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfluencersService } from 'src/app/shared/services/influencers.service';
import { MessageService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-influencer-dash',
  templateUrl: './influencer-dash.component.html',
  styleUrls: ['./influencer-dash.component.scss'],
  providers: [MessageService]
})
export class InfluencerDashComponent implements OnInit {

  activeInfluencer: number;
  influencerData: any;
  cloneInfluencerData: any;
  influencerRequests: any;
  lastRequest: any;

  ordersByMonths: number[] = [];
  monthlySales: number = 0;
  monthlyRevenue: number = 0;
  balance: number;

  password: string = '';
  confpassword: string = '';
  message: string = '';

  activeTab: string = 'orders';

  requestAmount: number;
  messageAmountInvalid: string = '';
  requestData: any;

  editInfo: boolean = false;
  historyViewer: boolean = false;

  data: any;
  options: any;

  constructor(private router: Router, private influencerService: InfluencersService, private messageService: MessageService) {
  }

  async ngOnInit() {
    this.activeInfluencer = parseInt(localStorage.getItem('influencerId'));
    await this.loadInfluencerData()

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
          // data: [18, 55, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: this.ordersByMonths
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

  async loadInfluencerData() {
    const response = await this.influencerService.getInfluencer(this.activeInfluencer);
    this.influencerData = response.data[0];

    this.cloneInfluencerData = { ...this.influencerData };

    const { orders } = await this.influencerService.getAllOrdersWithMyCode(this.influencerData.discount_code);
    this.ordersByMonths = orders.map(order => {
      return order.order_count;
    });    

    const currentMonth = new Date().getMonth() + 1;
    this.monthlySales = orders.find(order => {
      return order.month == currentMonth;
    })?.order_count;

    this.monthlyRevenue = (this.monthlySales * 24.99) * 0.5;

    const respRequests = await this.influencerService.getRequests(this.influencerData.id);
    this.influencerRequests = respRequests.data;
    this.lastRequest = respRequests.data[respRequests.data.length -1]; 

  }

  logout() {
    localStorage.removeItem('influencerToken');
    localStorage.removeItem('influencerId');
    this.router.navigateByUrl('/page/influencers-program')
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  async saveInfluencerData() {
    this.message = '';
    if (this.password !== '') {
      if (this.password !== this.confpassword) {
        this.message = 'Your password confirmation does not match';
        return;
      } else {
        this.cloneInfluencerData.password = this.password;
      }
    }
    try {
      const resp = await this.influencerService.updateInfluencer(this.cloneInfluencerData.id, this.cloneInfluencerData)

      if (resp.data.affectedRows !== 0) {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Updated data' });
        this.enableEdition();
      }

    } catch (error) {
      console.log(error.message);
      this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', detail: `${error.message}` });
    }
  }

  async makeRequest() {
    try {
      if (this.requestAmount !== null && this.requestAmount !== undefined) {
        if (this.requestAmount > this.influencerData?.balance) {
          this.messageAmountInvalid = "The amount you are requesting exceeds your available funds."
        } else if(this.requestAmount < 10){
          this.messageAmountInvalid = "The minimum amount to request is 10 USD."
        }else{
          this.messageAmountInvalid = ""
          this.requestData = {
            influencerId: this.influencerData.id,
            fullname: this.influencerData.fullname,
            email: this.influencerData.email,
            requestAmount: this.requestAmount,
          }
  
          // ADD nueva solicitud en la BD
          const respRequest = await this.influencerService.createPaymentRequest(this.requestData);
          if(respRequest.data.affectedRows !== 0){
            this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Su solicitud ha sido registrada' });
          }
          
          // Actualizar el balance del influencer
          const respUpdateBalance = await this.influencerService.updateInfluencer(this.influencerData.id,{balance: this.influencerData.balance - this.requestAmount});
          console.log(respUpdateBalance);
          
        }
        this.requestAmount = null;
        this.loadInfluencerData();
      }
    } catch (error) {
      console.log(error.message);
      this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', detail: `${error.message}` });
    }
  }

  formatDate(dateString: string): string {
    if(dateString !== null && dateString !== ''){
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    }
    return '';
  }

  viewHistory(){
    this.historyViewer = true;
  }

  hideHistroy(){
    this.historyViewer = false;
  }

  enableEdition() {
    this.loadInfluencerData();
    this.editInfo = !this.editInfo;
  }
}
