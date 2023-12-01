import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { CartService } from '../../../services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  addToCart(productId: any) {
    const userId = this.currentUser._id;

    this.cartService.addToCart(userId, productId).subscribe({
      next: () => {
        this.snackBar.open('Added to cart successfully', '', {
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
