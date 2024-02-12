import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipstationService } from 'src/app/shared/services/shipstation.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})

export class TrackingComponent implements OnInit, AfterViewInit {

  public statusList: any[] = [
    {
      status: "on_hold",
      icon: "fa-hand-paper-o",
      description: "Your order is on hold, please try to check again in the next 12 hours."
    },
    {
      status: "shipped",
      icon: "fa-tags",
      description: ""
    },
    {
      status: "awaiting_shipment",
      icon: "fa-clock-o",
      description: "Your order is in process."
    },
    {
      status: "paid",
      icon: "fa-credit-card",
      description: ""
    }
  ];

  public statusActive: string = "awaiting_shipment";
  public notFound: boolean = false;
  public copied: boolean= false;  

  public orderId: string;
  public order: any;
  public shipment: any;

  constructor(
    private route: ActivatedRoute, 
    private shipstatioService: ShipstationService,
    private clipboard: Clipboard ) {
  }

  ngOnInit() { }

  async ngAfterViewInit(): Promise<void> {
    this.route.queryParams.subscribe(async (params) => {
      this.orderId = params.search;

      try {
        const orderInfo = await this.shipstatioService.getOrder(this.orderId);
        this.notFound = false;
        this.order = orderInfo;
        this.statusActive = orderInfo.orderStatus;

        this.statusList.map(elem => {
          if (elem.status === 'paid')
          elem.description = "Your order has been paid.:"+ " " +orderInfo.createDate.slice(0, 10);
        })

        const shipmentInfo = await this.shipstatioService.getShipment(this.orderId);
        this.shipment = shipmentInfo;

        this.statusList.map(elem => {
          if (elem.status === 'shipped')
            elem.description = "Your order already has a tracking number assigned to it.:"+ " " +shipmentInfo.shipments[0].shipDate.slice(0, 10);
        })

      } catch (error) {
        if (error.status === 404) {
          this.notFound = true;
          console.log("No se pudo encontrar la orden");
        }
      }
    });
  }

  isDisabled(i: number): boolean {
    if (this.statusActive !== 'on_hold') {
      const statusActiveIndex = this.statusList.findIndex(elem => elem.status === this.statusActive);
      return i < statusActiveIndex;
    } else {
      const statusActiveIndex = this.statusList.findIndex(elem => elem.status === this.statusActive);
      return i > statusActiveIndex;
    }
  }

  trought(i: number): boolean {
    if (this.statusActive !== 'on_hold' && this.statusList[i].status === 'on_hold') {
      return true;
    } else {
      return false;
    }
  }

  copyToClipboard(value: string) {
    this.clipboard.copy(value);
    this.copied = true;

    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }

  formatDate(dateString: any) {
    if (dateString) {
      const date = new Date(dateString);

      // Array con los nombres completos de los días de la semana
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      // Array con los nombres completos de los meses del año
      const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      // Obtiene el día de la semana, el mes y el año de la fecha
      const dayOfWeek = daysOfWeek[date.getDay()];
      const month = monthsOfYear[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();

      // Construye el string de fecha en el formato deseado
      return `${dayOfWeek} ${month} ${day} ${year}`;

    } else {
      return '-- -- --'
    }

  }

}
