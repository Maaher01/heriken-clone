import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartProducts: any;
  product: any;
  quantity: number = 1;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  displayedColumns: string[] = [
    'Serial',
    'Product',
    'Price',
    'Discount',
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

  getCartProducts() {
    this.cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
  }

  deleteItemFromCart(productId) {
    let products = JSON.parse(localStorage.getItem('cartProducts'));
    products = products.filter((product) => product._id !== productId);
    localStorage.setItem('cartProducts', JSON.stringify(products));
    this.getCartProducts();
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
}
