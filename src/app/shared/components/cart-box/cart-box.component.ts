import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from '../../../services/cart.service';
import { map, mergeMap } from 'rxjs';

@Component({
  selector: 'cart-box',
  templateUrl: './cart-box.component.html',
  styleUrls: ['./cart-box.component.scss'],
})
export class CartBoxComponent {
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
}
