import { Component } from '@angular/core';
import { UserService } from 'src/app/pages/auth/services/user.service';
import { CartService } from '../../services/cart.service';
import { map, mergeMap } from 'rxjs';

@Component({
  selector: 'cart-box',
  templateUrl: './cart-box.component.html',
  styleUrls: ['./cart-box.component.scss'],
})
export class CartBoxComponent {
  constructor(
    private userService: UserService,
    private cartService: CartService
  ) {}

  cartData$ = this.userService.currentUser$.pipe(
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
