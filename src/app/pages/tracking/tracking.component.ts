import { Component } from '@angular/core';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})

export class TrackingComponent {

  public statusList: string[] = ["Cancelled", "On_hold", "Shipped", "Awaiting_shipment", "Paid"];
  public statusActive: string = "Awaiting_shipment";

}
