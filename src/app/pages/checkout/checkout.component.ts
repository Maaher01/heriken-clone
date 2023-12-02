import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { map, mergeMap } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  errorResponse!: string;
  public currentUser: any;
  cartId: any

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  displayedColumns: string[] = [
    'Serial',
    'Product',
    'Price',
    'Quantity',
    'Total',
    'Action',
  ];

  checkoutForm = this.fb.group({
    name: new FormControl('', [Validators.required]),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    shippingAddress: new FormControl('', [
      Validators.required,
    ]),
    deliveryCharge: new FormControl('', [Validators.required]),
    paymentMethod: new FormControl('', [Validators.required]),
  });

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
            this.cartId = res.data[0]._id
            return res.data[0];
          }
        })
      );
    })
  );

  confirmOrder() {
    const userId = this.currentUser._id;

    this.orderService.addOrder(this.checkoutForm.value, userId, this.cartId).subscribe({
      next: () => {
        this.checkoutForm.reset();
        this.router.navigate(['/pages/order-confirmation']);
      },
      error: (err) => {
        this.errorResponse = err.error.message
      }
    });
  }
}
