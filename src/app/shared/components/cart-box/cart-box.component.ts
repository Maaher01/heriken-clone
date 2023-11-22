import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'cart-box',
  templateUrl: './cart-box.component.html',
  styleUrls: ['./cart-box.component.scss'],
})
export class CartBoxComponent implements OnInit {
  cartProducts: Product[];
  cartProdQuantity: number = 0;
  subTotal: number = 0;

  constructor() {}

  ngOnInit(): void {
    // this.getCartProductQuantity();
    // this.getCartSubTotal();
  }

  // getCartProductQuantity() {
  //   this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
  //   this.cartProdQuantity = this.cartProducts.length;
  // }

  // getCartSubTotal() {
  //   this.subTotal = this.cartProducts
  //     .map((m) => m.price)
  //     .reduce((acc: number, value: number) => acc + value, 0);
  // }
}
