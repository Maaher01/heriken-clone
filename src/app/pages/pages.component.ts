import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  public currentUser: any;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  cartData$ = this.authService.currentUser$.pipe(
    mergeMap((user) => {
      return this.cartService.getUserCart(user._id).pipe(
        map((res) => {
          if (res.data[0]) {
            return res.data[0];
          }
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
