import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
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
  checkoutForm!: FormGroup;
  public currentUser: any;
  cartId: any;

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
    // 'Discount',
    'Quantity',
    'Total',
    'Action',
  ];

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );

    this.checkoutForm = this.fb.group({
      name: new FormControl(this.currentUser.fullName, [Validators.required]),
      phoneNo: new FormControl(this.currentUser.phoneNo, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      shippingAddress: new FormControl(this.currentUser.address, [
        Validators.required,
      ]),
      deliveryCharge: new FormControl('', [Validators.required]),
      paymentType: new FormControl('', [Validators.required]),
    });
  }

  cartData$ = this.authService.currentUser$.pipe(
    mergeMap((user) => {
      return this.cartService.getUserCart(user._id).pipe(
        map((res) => {
          if (res.data[0]) {
            this.cartId = res.data[0]._id;
            return res.data[0];
          }
        })
      );
    })
  );

  confirmOrder() {
    const user = this.currentUser._id;

    this.orderService
      .addOrder(this.checkoutForm.value, user, this.cartId)
      .subscribe({
        next: () => {
          console.log("Hello");
          
          this.checkoutForm.reset();
          this.router.navigate(['/order-confirmation']);
        },
        error: (err) => {
          this.errorResponse = err.error.message;
        },
      });
  }

  addToCart(productId: any) {
    const userId = this.currentUser._id;
    this.cartService.addToCart(userId, productId).subscribe({
      error: (err) => {
        this.errorResponse = err.message;
      },
    });
  }

  decreaseProductQuantity(productId: any) {
    const userId = this.currentUser._id;
    this.cartService.decreaseProductQuantity(userId, productId).subscribe({
      error: (err) => {
        this.errorResponse = err.message;
      },
    });
  }

  increaseProductQuantity(productId: any) {
    const userId = this.currentUser._id;
    this.cartService.increaseProductQuantity(userId, productId).subscribe({
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
}
