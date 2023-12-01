import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BasicInfoComponent } from './basic-info/basic-info.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  accountSection = BasicInfoComponent;

  constructor() {}

  ngOnInit(): void {}

  assignAccountComponent(component) {
    if (component === 'more-details') {
      this.accountSection = BasicInfoComponent;
    }
  }
}
