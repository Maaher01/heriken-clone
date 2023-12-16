import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { map, mergeMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  public currentUser: any;
  errorResponse: any;

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

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
      error: (err) => {
        this.errorResponse = err.message;
      },
    });
  }

  removeFromCart(productId: any) {
    const userId = this.currentUser._id;
    this.cartService.removeFromCart(userId, productId).subscribe({
      error: (err) => {
        this.errorResponse = err.message;
      },
    });
  }

  emptyCartCheckout() {
    this.snackBar.open('No products in cart', '', {
      duration: 1500,
      panelClass: ['snackbar-warn'],
    });
  }
}
