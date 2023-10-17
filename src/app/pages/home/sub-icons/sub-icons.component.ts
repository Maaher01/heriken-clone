import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-icons',
  templateUrl: './sub-icons.component.html',
  styleUrls: ['./sub-icons.component.scss']
})
export class SubIconsComponent implements OnInit {

  list = [
    {
      title: 'HOME DELIVERY',
      subTitle: '24-72 Hours',
      icon: 'bi-truck',
    },
    {
      title: 'Best Warranty Policy',
      subTitle: 'With A 30 Day',
      icon: 'bi-arrow-repeat',
    },
    {
      title: 'SECURE SHOPPING',
      subTitle: '100% Safe Transactions',
      icon: 'bi-headset',
    },
    {
      title: 'ORDER PLACED',
      subTitle: 'Total 1,84,560 +',
      icon: 'bi-lock-fill',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
