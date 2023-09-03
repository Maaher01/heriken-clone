import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  cartProducts: any;
  product: any;
  quantity: number = 1;
  totalPrice: number;

  constructor() {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
  }

  increaseQuantity(productId) {
    this.product = this.cartProducts.find((m) => m?._id == productId);
    this.product.quantity = this.product.quantity + 1;
    return this.product.quantity;
  }

  decreaseQuantity(productId) {
    this.product = this.cartProducts.find((m) => m?._id == productId);
    this.product.quantity = this.product.quantity - 1;
    return this.product.quantity;
  }
}
