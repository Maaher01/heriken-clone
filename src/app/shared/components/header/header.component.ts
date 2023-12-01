import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showSearchBox: boolean = false;
  showCategoryMenu: boolean = false;
  showAccountMenu: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  toggleSearchBox() {
    this.showSearchBox = !this.showSearchBox;
  }

  // toggleCategoryDropdown() {
  //   this.showCategoryMenu = !this.showCategoryMenu;
  // }

  toggleAccountDropdown() {
    this.showAccountMenu = !this.showAccountMenu;
  }

  logout() {
    this.authService.logout();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
