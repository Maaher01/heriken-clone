import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  cartProducts: Product[];
  cartProdQuantity: number = 0;
  product: any;
  quantity: number = 1;
  totalPrice: number;
  subTotal: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.getCartProductQuantity();
    this.getCartSubTotal()
  }

  getCartProductQuantity() {
    this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    this.cartProdQuantity = this.cartProducts.length;
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

  getCartSubTotal() {
    this.subTotal = this.cartProducts
      .map((m) => m.price)
      .reduce((acc: number, value: number) => acc + value, 0);
  }
}
