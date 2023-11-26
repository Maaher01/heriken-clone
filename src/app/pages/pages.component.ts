import { Component, Input } from '@angular/core';
import { UserService } from './auth/services/user.service';
import { CartService } from '../shared/services/cart.service';
import { map, mergeMap } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  public currentUser: any;

  constructor(
    private userService: UserService,
    private cartService: CartService
  ) {}

  cartData$ = this.userService.currentUser$.pipe(
    mergeMap((user) => {
      return this.cartService.getUserCart(user._id).pipe(
        map((res) => {
          console.log(res.data[0].cartProducts);
          return res.data[0].cartProducts;
        })
      );
    })
  );

  addToCart(productId: any) {
    const userId = this.currentUser._id;

    this.cartService.addToCart(userId, productId).subscribe({
      next: () => {},
      error: (err) => {
        console.log(err);
      },
    });
  }
}
