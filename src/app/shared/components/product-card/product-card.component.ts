import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { CartService } from '../../services/cart.service';
import { UserService } from 'src/app/pages/auth/services/user.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  public currentUser: any;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  addToCart(productId: any) {
    const userId = this.currentUser._id;

    this.cartService.addToCart(userId, productId).subscribe({
      next: () => {
        this.snackBar.open("Added to cart successfully", '', {
          duration: 1500,
          panelClass: ['snackbar'],
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
