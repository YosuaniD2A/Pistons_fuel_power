import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  panels: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.panels = [
      { id: 'static-1', type: 'text', title: 'What kind of garments do we use?', content: 'We want you to try the best shirts in the market. Most of our products are 100% cotton, but this is subject to availability from our suppliers. WE PRINT IN SIZES SMALL TO 5XLARGE!' },
      { id: 'static-2', type: 'text/image', title: 'What are the sizes and measurements of the products?', content: 'The measurements of our shirts are the following.', url:'' },
      { id: 'static-3', type: 'text', title: 'What payments are accepted?', content: 'You can pay your orders through PayPal, and/or credit cards.' },
      { id: 'static-4', type: 'text', title: 'Does Pistons Fuel Power have a physical store?', content: 'No. We’re only focused on e-Commerce, which means we only sell our products through online stores.' },
      { id: 'static-5', type: 'text', title: 'What can I do to preserve the good quality of my shirt?', content: 'We suggest you wash them inside-out in cold water, and line dry.' },
      { id: 'static-6', type: 'text', title: 'How much time is it going to take to receive my order?', content: 'We have one handling working day to process your order. Once your order ships, it takes 3 to 5 working days to be delivered to your doorstep.' },
      { id: 'static-7', type: 'text', title: 'How can I track my package?', content: 'Every time you place an order, we will send you the tracking number so you know every detail of your delivery.' },
      { id: 'static-8', type: 'text', title: 'Still have questions?', content: 'Send us an email to hello@pistonsfuelpower.com or call us by phone to clear up your doubts. We’re always happy to help!' },
    ];
  }

}
