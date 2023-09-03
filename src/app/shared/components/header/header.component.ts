import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/pages/auth/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showSearchBox: boolean = false;
  showCategoryMenu: boolean = false;
  showAccountMenu: boolean = false;

  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  toggleSearchBox() {
    this.showSearchBox = !this.showSearchBox;
  }

  toggleCategoryDropdown() {
    this.showCategoryMenu = !this.showCategoryMenu;
  }

  toggleAccountDropdown() {
    this.showAccountMenu = !this.showAccountMenu;
  }

  logout() {
    this.userService.logout();
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }
}
