import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/models/product';
import { UserService } from '../auth/services/user.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productData: any;
  products: Product[];
  public currentUser: any;
  cartData: any;
  cartProducts: any;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.userService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if(this.currentUser)
      console.log(this.currentUser);
    });
  }

  getUserCart() {
    const userId = this.currentUser._id;

    this.cartService.getUserCart(userId).subscribe({
      next: (result) => {
        console.log(userId);
        this.cartData = result;
        this.cartProducts = this.cartData.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (results) => {
        this.productData = results;
        this.products = this.productData.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
