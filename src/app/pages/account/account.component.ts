import { Component } from '@angular/core';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { OrderListComponent } from './order-list/order-list.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  accountSection = BasicInfoComponent;

  constructor() {}

  assignAccountComponent(component) {
    if (component === 'order-list') {
      this.accountSection = BasicInfoComponent;
    } 
    // else if (component === 'order-list') {
    //   this.accountSection = OrderListComponent
    // }
  }
}
