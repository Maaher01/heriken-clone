import { Component } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../auth/services/user.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cartService: CartService
  ) {}

  displayedColumns: string[] = [
    'Serial',
    'Product',
    'Price',
    // 'Discount',
    'Quantity',
    'Total',
    'Action',
  ];

  checkoutForm = this.fb.group({
    name: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    address: new FormControl('', [Validators.required]),
    deliveryLocation: new FormControl('', [Validators.required]),
    payMethod: new FormControl('', [Validators.required]),
  });

  cartData$ = this.userService.currentUser$.pipe(
    mergeMap((user) => {
      return this.cartService.getUserCart(user._id).pipe(
        map((res) => {
          if (res.data[0]) {
            console.log(res.data[0]);
            return res.data[0];
          }
        })
      );
    })
  );

  confirmOrder() {
    
  }
}
