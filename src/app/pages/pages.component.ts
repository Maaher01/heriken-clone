import { Component, OnInit } from '@angular/core';
import { UserService } from './auth/services/user.service';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  public currentUser: any;
  cartData: any;
  cartProducts: any;

  constructor(
    
    
  ) {}

  ngOnInit(): void {
    
  }

  
}
